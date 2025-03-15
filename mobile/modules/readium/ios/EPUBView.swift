import ExpoModulesCore
import WebKit
import R2Shared
import R2Navigator
import ReadiumAdapterGCDWebServer

struct Highlight {
    var id: String
    var color: UIColor
    var locator: Locator
}

struct CustomFont {
    var uri: String
    var name: String
    var type: String
}

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class EPUBView: ExpoView {
    private let templates = HTMLDecorationTemplate.defaultTemplates()
    let onLocatorChange = EventDispatcher()
    let onMiddleTouch = EventDispatcher()
    let onDoubleTouch = EventDispatcher()
    let onSelection = EventDispatcher()
    let onError = EventDispatcher()
    let onHighlightTap = EventDispatcher()
    let onBookmarksActivate = EventDispatcher()

    public var bookId: Int?
    public var initialLocation: Locator?
    public var locator: Locator?
    public var isPlaying: Bool = false
    public var navigator: EPUBNavigatorViewController?
    public var highlights: [Highlight] = []
    public var bookmarks: [Locator] = []
    public var readaloudColor: UIColor = .yellow
    public var preferences: EPUBPreferences = EPUBPreferences(
        fontFamily: FontFamily(rawValue: "Literata"),
        lineHeight: 1.4,
        paragraphSpacing: 0.5
    )
    public var customFonts: [CustomFont] = []

    private var didTapWork: DispatchWorkItem?

    public func initializeNavigator() {
        guard let bookId = self.bookId, let locator = self.initialLocation else {
            return
        }

        guard let publication = BookService.instance.getPublication(for: bookId) else {
            print("skipping navigator init, publication has not yet been opened")
            return
        }

        let resources = Bundle.main.resourceURL!

        let fontFamilyDeclarations = [
            CSSFontFamilyDeclaration(
                fontFamily: FontFamily(rawValue: "OpenDyslexic"),
                fontFaces: [
                    CSSFontFace(
                        file: resources.appendingPathComponent("OpenDyslexic-Regular.otf"),
                        style: .normal, weight: .standard(.normal)
                    ),
                    CSSFontFace(
                        file: resources.appendingPathComponent("OpenDyslexic-Bold.otf"),
                        style: .normal, weight: .standard(.bold)
                    ),
                    CSSFontFace(
                        file: resources.appendingPathComponent("OpenDyslexic-Italic.otf"),
                        style: .italic, weight: .standard(.normal)
                    ),
                    CSSFontFace(
                        file: resources.appendingPathComponent("OpenDyslexic-Bold-Italic.otf"),
                        style: .italic, weight: .standard(.bold)
                    ),
                ]
            ).eraseToAnyHTMLFontFamilyDeclaration(),
            CSSFontFamilyDeclaration(
                fontFamily: FontFamily(rawValue: "Literata"),
                fontFaces: [
                    CSSFontFace(
                        file: resources.appendingPathComponent("Literata_500Medium.ttf"),
                        style: .normal, weight: .standard(.normal)
                    ),
                ]
            ).eraseToAnyHTMLFontFamilyDeclaration(),
        ] + customFonts.map {
            CSSFontFamilyDeclaration(
                fontFamily: FontFamily(rawValue: $0.name),
                fontFaces: [
                    CSSFontFace(
                        file: URL(fileURLWithPath: $0.uri),
                        style: .normal,
                        weight: .variable(200...900)
                    )
            ]).eraseToAnyHTMLFontFamilyDeclaration()
        }

        guard let navigator = try? EPUBNavigatorViewController(
            publication: publication,
            initialLocation: locator,
            config: .init(
                preferences: preferences,
                defaults: EPUBDefaults(
                    publisherStyles: false
                ),
                decorationTemplates: templates,
                fontFamilyDeclarations: fontFamilyDeclarations
            ),
            httpServer: GCDHTTPServer.shared
        ) else {
            print("Failed to create Navigator instance")
            return
        }

        navigator.delegate = self
        addSubview(navigator.view)
        self.navigator = navigator
        self.decorateHighlights()
        self.navigator?.observeDecorationInteractions(inGroup: "highlights") { [weak self] event in
            guard let rect = event.rect else {
                return
            }
            self?.onHighlightTap(["decoration": event.decoration.id, "x": rect.midX, "y": rect.minY])
        }
    }

    public func destroyNavigator() {
        self.navigator?.view.removeFromSuperview()
    }

    public func updatePreferences() {
        navigator?.submitPreferences(preferences)
    }

    func go(locator: Locator) {
        guard let navigator = self.navigator else {
            self.initialLocation = locator
            initializeNavigator()
            return
        }

        _ = navigator.go(to: locator, animated: true) {
            if self.isPlaying {
                self.highlightFragment(locator: locator)
            }
        }
    }

    func decorateHighlights() {
        let decorations = highlights.map { highlight in
            let style = Decoration.Style.highlight(tint: highlight.color, isActive: true)
            return Decoration(
                id: highlight.id,
                locator: highlight.locator,
                style: style
            )
        }
        navigator?.apply(decorations: decorations, in: "highlights")
    }

    func highlightFragment(locator: Locator) {
        guard let id = locator.locations.fragments.first else {
            return
        }

        let overlayHighlight = Decoration.Style.highlight(tint: readaloudColor, isActive: true)
        let decoration = Decoration(
            id: id,
            locator: locator,
            style: overlayHighlight)

        navigator?.apply(decorations: [decoration], in: "overlay")
    }

    func clearHighlightedFragment() {
        navigator?.apply(decorations: [], in: "overlay")
    }

    override func layoutSubviews() {
        guard let navigatorView = self.navigator?.view else {
            print("layoutSubviews called before navigator was instantiated")
            return
        }

        navigatorView.frame = bounds
    }

    func findOnPage(locator: Locator) {
        guard let epubNav = navigator else {
            return
        }

        guard let currentProgression = locator.locations.progression else {
            return
        }

        let joinedProgressions = bookmarks
            .filter { $0.href == locator.href }
            .compactMap(\.locations.progression)
            .map { "\($0)" }
            .joined(separator: ",")

        let jsProgressionsArray = "[\(joinedProgressions)]"

        epubNav.evaluateJavaScript("""
            (function() {
                const maxScreenX = window.orientation === 0 || window.orientation == 180
                        ? screen.width
                        : screen.height;

                function snapOffset(offset) {
                    const value = offset + 1;

                    return value - (value % maxScreenX);
                }

                const documentWidth = document.scrollingElement.scrollWidth;
                const currentPageStart = snapOffset(documentWidth * \(currentProgression));
                const currentPageEnd = currentPageStart + maxScreenX;
                return \(jsProgressionsArray).filter((progression) =>
                    progression * documentWidth >= currentPageStart &&
                    progression * documentWidth < currentPageEnd
                );
            })();
        """) {
            switch $0 {
            case .failure(let e):
                print(e)
                self.onBookmarksActivate(["activeBookmarks": []])
            case .success(let anyValue):
                guard let value = anyValue as? [Double] else {
                    self.onBookmarksActivate(["activeBookmarks": []])
                    return
                }

                let found = self.bookmarks.filter {
                    guard let progression = $0.locations.progression else {
                        return false
                    }
                    return value.contains(progression)
                }

                self.onBookmarksActivate(["activeBookmarks": found.map(\.json)])
            }
        }
    }
}

extension EPUBView: UIGestureRecognizerDelegate {
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        true
    }
}

extension EPUBView: WKScriptMessageHandler {
    /// Handles incoming calls from JS.
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
            case "storytellerDoubleClick":
                guard let fragment = message.body as? String else {
                    return
                }
                guard let bookId = self.bookId else {
                    return
                }
                guard let currentLocator = self.navigator?.currentLocation else {
                    return
                }

                guard let locator = try? BookService.instance.getLocatorFor(bookId: bookId, href: currentLocator.href, fragment: fragment) else {
                    return
                }

                self.onDoubleTouch(locator.json)
            case "storytellerSelectionCleared":
                onSelection(["cleared": true])
            default:
                return
        }
    }
}

extension EPUBView: EPUBNavigatorDelegate {
    func navigator(_ navigator: any SelectableNavigator, shouldShowMenuForSelection selection: Selection) -> Bool {
        onSelection(["x": selection.frame?.midX as Any, "y": selection.frame?.minY as Any, "locator": selection.locator.json])
        return false
    }

    func navigator(_ navigator: EPUBNavigatorViewController, setupUserScripts userContentController: WKUserContentController) {
        guard let bookId = self.bookId else {
            return
        }
        guard let locator = self.locator else {
            return
        }

        let fragments = BookService.instance.getFragments(for: bookId, locator: locator)

        let joinedFragments = fragments.map(\.fragment).map { "\"\($0)\"" }.joined(separator: ",")
        let jsFragmentsArray = "[\(joinedFragments)]"

        let scriptSource = """
            function addDoubleTapListeners() {
                let storytellerDoubleClickTimeout = null;
                let storytellerTouchMoved = false;
                for (const fragment of globalThis.storytellerFragments) {
                    const element = document.getElementById(fragment);
                    if (!element) continue;
                    element.addEventListener('touchstart', (event) => {
                        storytellerTouchMoved = false;
                    });
                    element.addEventListener('touchmove', (event) => {
                        storytellerTouchMoved = true;
                    });
                    element.addEventListener('touchend', (event) => {
                        if (storytellerTouchMoved || !document.getSelection().isCollapsed || event.changedTouches.length !== 1) return;

                        event.bubbles = true
                        event.clientX = event.changedTouches[0].clientX
                        event.clientY = event.changedTouches[0].clientY
                        const clone = new MouseEvent('click', event);
                        event.stopImmediatePropagation();
                        event.preventDefault();

                        if (storytellerDoubleClickTimeout) {
                            clearTimeout(storytellerDoubleClickTimeout);
                            storytellerDoubleClickTimeout = null;
                            window.webkit.messageHandlers.storytellerDoubleClick.postMessage(fragment);
                            return
                        }

                        storytellerDoubleClickTimeout = setTimeout(() => {
                            storytellerDoubleClickTimeout = null;
                            element.parentElement.dispatchEvent(clone);
                        }, 350);
                    })
                }
            }

            document.addEventListener('selectionchange', () => {
                if (document.getSelection().isCollapsed) {
                    window.webkit.messageHandlers.storytellerSelectionCleared.postMessage(null);
                }
            });

            globalThis.storytellerFragments = \(jsFragmentsArray);
            addDoubleTapListeners();
        """

        userContentController.addUserScript(WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        userContentController.add(self, name: "storytellerDoubleClick")
        userContentController.add(self, name: "storytellerSelectionCleared")
    }

    func navigator(_ navigator: R2Navigator.Navigator, presentError error: R2Navigator.NavigatorError) {
        self.onError(["errorDescription": error.errorDescription as Any, "failureReason": error.failureReason as Any, "recoverySuggestion": error.recoverySuggestion as Any])
    }

    func navigator(_ navigator: VisualNavigator, didTapAt point: CGPoint) {
        self.didTapWork = nil
        if point.x < self.bounds.maxX * 0.2 {
            _ = navigator.goBackward(animated: true) {}
            return
        }
        if point.x > self.bounds.maxX * 0.8 {
            _ = navigator.goForward(animated: true) {}
            return
        }

        self.onMiddleTouch()
    }

    func navigator(_ navigator: Navigator, locationDidChange locator: Locator) {
        if isPlaying {
            return
        }

        guard let epubNav = navigator as? EPUBNavigatorViewController else {
            return
        }

        findOnPage(locator: locator)

        if locator.href != self.locator?.href {
            guard let bookId = self.bookId else {
                return
            }

            let fragments = BookService.instance.getFragments(for: bookId, locator: locator)

            let joinedFragments = fragments.map(\.fragment).map { "\"\($0)\"" }.joined(separator: ",")
            let jsFragmentsArray = "[\(joinedFragments)]"

            epubNav.evaluateJavaScript("""
                globalThis.storytellerFragments = \(jsFragmentsArray);
                addDoubleTapListeners();
            """)
        }

        epubNav.evaluateJavaScript("""
            (function() {
                function isEntirelyOnScreen(element) {
                    const rects = element.getClientRects();
                    return Array.from(rects).every((rect) => {
                        const isVerticallyWithin = rect.bottom >= 0 && rect.top <= window.innerHeight;
                        const isHorizontallyWithin = rect.right >= 0 && rect.left <= window.innerWidth;
                        return isVerticallyWithin && isHorizontallyWithin;
                    });
                }

                for (const fragment of globalThis.storytellerFragments) {
                    const element = document.getElementById(fragment);
                    if (!element) continue;
                    if (isEntirelyOnScreen(element)) {
                        return fragment;
                    }
                }

                return null;
            })();
        """) {
            switch $0 {
            case .failure(_):
                self.onLocatorChange(locator.json)
            case .success(let anyValue):
                guard let value = anyValue as? String else {
                    self.onLocatorChange(locator.json)
                    return
                }

                self.onLocatorChange(
                    locator.copy(
                        locations: {
                            $0.otherLocations["fragments"] = [value]
                        }
                    ).json
                )
            }
        }

        self.locator = locator
    }
}
