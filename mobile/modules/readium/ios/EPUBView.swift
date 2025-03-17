import ExpoModulesCore
import WebKit
import R2Shared
import R2Navigator
import ReadiumAdapterGCDWebServer

struct Highlight: Equatable {
    var id: String
    var color: UIColor
    var locator: Locator
}

struct CustomFont: Equatable {
    var uri: String
    var name: String
    var type: String
}

struct Props {
    var bookId: Int?
    var locator: Locator?
    var isPlaying: Bool?
    var highlights: [Highlight]?
    var bookmarks: [Locator]?
    var readaloudColor: UIColor?
    var customFonts: [CustomFont]?
    var foreground: Color?
    var background: Color?
    var fontFamily: FontFamily?
    var lineHeight: Double?
    var paragraphSpacing: Double?
    var fontSize: Double?
    var textAlign: TextAlignment?
}

struct FinalizedProps {
    var bookId: Int
    var locator: Locator
    var isPlaying: Bool
    var highlights: [Highlight]
    var bookmarks: [Locator]
    var readaloudColor: UIColor
    var customFonts: [CustomFont]
    var foreground: Color
    var background: Color
    var fontFamily: FontFamily
    var lineHeight: Double
    var paragraphSpacing: Double
    var fontSize: Double
    var textAlign: TextAlignment
}

class EPUBView: ExpoView {
    private let templates = HTMLDecorationTemplate.defaultTemplates()
    let onLocatorChange = EventDispatcher()
    let onMiddleTouch = EventDispatcher()
    let onDoubleTouch = EventDispatcher()
    let onSelection = EventDispatcher()
    let onError = EventDispatcher()
    let onHighlightTap = EventDispatcher()
    let onBookmarksActivate = EventDispatcher()

    public var navigator: EPUBNavigatorViewController?

    public var pendingProps: Props = Props()
    public var props: FinalizedProps?

    public func finalizeProps() {
        let oldProps = props

        props = FinalizedProps(
            bookId: pendingProps.bookId!,
            locator: pendingProps.locator!,
            isPlaying: pendingProps.isPlaying ?? oldProps?.isPlaying ?? false,
            highlights: pendingProps.highlights ?? oldProps?.highlights ?? [],
            bookmarks: pendingProps.bookmarks ?? oldProps?.bookmarks ?? [],
            readaloudColor: pendingProps.readaloudColor ?? oldProps?.readaloudColor ?? .yellow,
            customFonts: pendingProps.customFonts ?? oldProps?.customFonts ?? [],
            foreground: pendingProps.foreground ?? oldProps?.foreground ?? Color(hex: "#111111")!,
            background: pendingProps.background ?? oldProps?.background ?? Color(hex: "#FFFFFF")!,
            fontFamily: pendingProps.fontFamily ?? oldProps?.fontFamily ?? FontFamily(rawValue: "Literata"),
            lineHeight: pendingProps.lineHeight ?? oldProps?.lineHeight ?? 1.4,
            paragraphSpacing: pendingProps.paragraphSpacing ?? oldProps?.paragraphSpacing ?? 0.5,
            fontSize: pendingProps.fontSize ?? oldProps?.fontSize ?? 1.0,
            textAlign: pendingProps.textAlign ?? oldProps?.textAlign ?? TextAlignment.justify
        )

        if props!.bookId != oldProps?.bookId || props!.customFonts != oldProps?.customFonts {
            destroyNavigator()
            initializeNavigator()
            return
        }
        
        // Don't go to a new location if it's the same as the current location, except with
        // different fragments. Prevents unnecessarily triggering renders and state updates
        // when the position hasn't actually changed
        let locatorComp = oldProps?.locator.locations.fragments.isEmpty ?? false
            ? props!.locator.copy( locations: { $0.fragments = [] })
            : props!.locator;

        if locatorComp != oldProps?.locator {
            go(locator: props!.locator)
        } else if props!.isPlaying != oldProps?.isPlaying {
            if props!.isPlaying {
                highlightFragment(locator: props!.locator)
            } else {
                clearHighlightedFragment()
            }
        }
        
        if props!.highlights != oldProps?.highlights {
            decorateHighlights()
        }
        
        if props!.bookmarks != oldProps?.bookmarks {
            findOnPage(locator: props!.locator)
        }
        
        if props!.readaloudColor != oldProps?.readaloudColor {
            clearHighlightedFragment()
            highlightFragment(locator: props!.locator)
        }
        
        navigator!.submitPreferences(EPUBPreferences(
            backgroundColor: props!.background,
            fontFamily: props!.fontFamily,
            fontSize: props!.fontSize,
            lineHeight: props!.lineHeight,
            paragraphSpacing: props!.paragraphSpacing,
            textAlign: props!.textAlign,
            textColor: props!.foreground
        ))
    }

    // the fuck is this?
    private var didTapWork: DispatchWorkItem?

    public func initializeNavigator() {
        guard let publication = BookService.instance.getPublication(for: props!.bookId) else {
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
        ] + props!.customFonts.map {
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
            initialLocation: props!.locator,
            config: .init(
                preferences: EPUBPreferences(
                    backgroundColor: props!.background,
                    fontFamily: props!.fontFamily,
                    fontSize: props!.fontSize,
                    lineHeight: props!.lineHeight,
                    paragraphSpacing: props!.paragraphSpacing,
                    textAlign: props!.textAlign,
                    textColor: props!.foreground
                ),
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

    func go(locator: Locator) {
        _ = navigator!.go(to: locator, animated: true) {
            if self.props!.isPlaying {
                self.highlightFragment(locator: locator)
            }
        }
    }

    func decorateHighlights() {
        let decorations = props!.highlights.map { highlight in
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

        let overlayHighlight = Decoration.Style.highlight(tint: props!.readaloudColor, isActive: true)
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

        let joinedProgressions = props!.bookmarks
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

                let found = self.props!.bookmarks.filter {
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

                guard let locator = try? BookService.instance.getLocatorFor(bookId: props!.bookId, href: props!.locator.href, fragment: fragment) else {
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

        let fragments = BookService.instance.getFragments(for: props!.bookId, locator: props!.locator)

        let joinedFragments = fragments.map(\.fragment).map { "\"\($0)\"" }.joined(separator: ",")
        let jsFragmentsArray = "[\(joinedFragments)]"

        let scriptSource = """
            globalThis.storyteller = {};
            storyteller.doubleClickTimeout = null;
            storyteller.touchMoved = false;
        
            storyteller.touchStartHandler = (event) => {
                storyteller.touchMoved = false;
            }
        
            storyteller.touchMoveHandler = (event) => {
                storyteller.touchMoved = true;
            }
        
            storyteller.touchEndHandler = (event) => {
                if (storyteller.touchMoved || !document.getSelection().isCollapsed || event.changedTouches.length !== 1) return;

                event.bubbles = true
                event.clientX = event.changedTouches[0].clientX
                event.clientY = event.changedTouches[0].clientY
                const clone = new MouseEvent('click', event);
                event.stopImmediatePropagation();
                event.preventDefault();

                if (storyteller.doubleClickTimeout) {
                    clearTimeout(storyteller.doubleClickTimeout);
                    storyteller.doubleClickTimeout = null;
                    window.webkit.messageHandlers.storytellerDoubleClick.postMessage(event.currentTarget.id);
                    return
                }
        
                const element = event.currentTarget;

                storyteller.doubleClickTimeout = setTimeout(() => {
                    storyteller.doubleClickTimeout = null;
                    element.parentElement.dispatchEvent(clone);
                }, 350);
            }
        
        
            storyteller.observer = new IntersectionObserver((entries) => {
                let firstEl = null
                entries.map((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.addEventListener('touchstart', storyteller.touchStartHandler)
                        entry.target.addEventListener('touchmove', storyteller.touchMoveHandler)
                        entry.target.addEventListener('touchend', storyteller.touchEndHandler)
                    } else {
                        entry.target.removeEventListener('touchstart', storyteller.touchStartHandler)
                        entry.target.removeEventListener('touchmove', storyteller.touchMoveHandler)
                        entry.target.removeEventListener('touchend', storyteller.touchEndHandler)
                    }
        
                    if (entry.intersectionRatio === 1) {
                        if (!firstEl || entry.target.getBoundingClientRect().top < firstEl.getBoundingClientRect().top) {
                            firstEl = entry.target
                        }
                    }
                })
                storyteller.firstVisibleFragment = firstEl
            }, {
                threshold: [0, 1],
            })
        
            document.addEventListener('selectionchange', () => {
                if (document.getSelection().isCollapsed) {
                    window.webkit.messageHandlers.storytellerSelectionCleared.postMessage(null);
                }
            });

            storyteller.fragmentIds = \(jsFragmentsArray);
            storyteller.fragmentIds.map((id) => document.getElementById(id)).forEach((element) => {
                storyteller.observer.observe(element)
            })
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
        if props!.isPlaying {
            return
        }
        
        let navigator = (navigator as! EPUBNavigatorViewController)

        findOnPage(locator: locator)

        if locator.href != props!.locator.href {
            let fragments = BookService.instance.getFragments(for: props!.bookId, locator: locator)

            let joinedFragments = fragments.map(\.fragment).map { "\"\($0)\"" }.joined(separator: ",")
            let jsFragmentsArray = "[\(joinedFragments)]"

            navigator.evaluateJavaScript("""
                storyteller.fragmentIds = \(jsFragmentsArray);
                storyteller.fragmentIds.map((id) => document.getElementById(id)).forEach((element) => {
                    storyteller.observer.observe(element)
                })
            """)
        }

        navigator.evaluateJavaScript("""
            storyteller.firstVisibleFragment?.id
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
    }
}
