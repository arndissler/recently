interface Window {
    browser: typeof browser;
    messenger: typeof browser;
}

import messenger = browser;

interface EventHandler<T> {
    readonly addListener: (callback: T) => void;
    readonly hasListener: (callback: T) => boolean;
    readonly removeListener: (callback: T) => void;
}

declare namespace browser.manifest {
    /**
     * Represents a native manifest file
     */
    /* skipped: NativeManifest: undefined */
    type NativeManifest =
        | {
              name: string;
              description: string;
              path: string;
              type: 'pkcs11' | 'stdio';
              allowed_extensions: /* z8array */ manifest.ExtensionID[];
          }
        | {
              name: /* lookup type? "manifest.ExtensionID" */ manifest.ExtensionID;
              description: string;
              data: /* "unknown" undefined */ object;
              type: 'storage';
          };
    /**
     * Common properties for all manifest.json files
     */
    interface ManifestBase {
        manifest_version: number;
        applications?: {
            gecko?: FirefoxSpecificProperties;
        };
        browser_specific_settings?: {
            gecko?: FirefoxSpecificProperties;
            edge?: /* "unknown" undefined */ object;
        };
        name: string;
        short_name?: string;
        description?: string;
        author?: string;
        version: string;
        homepage_url?: string;
    }

    /**
     * Represents a WebExtension manifest.json file
     */
    interface WebExtensionManifest {
        minimum_chrome_version?: string;
        minimum_opera_version?: string;
        icons?: /* "unknown" undefined */ object;
        incognito?: 'not_allowed' | 'spanning';
        background?:
            | {
                  page: ExtensionURL;
                  persistent?: PersistentBackgroundProperty;
              }
            | {
                  scripts: ExtensionURL[];
                  persistent?: PersistentBackgroundProperty;
              };
        options_ui?: {
            page: ExtensionURL;
            browser_style?: boolean;
            chrome_style?: boolean;
            open_in_tab?: boolean;
        };
        content_scripts?: ContentScript[];
        content_security_policy?:
            | string
            | {
                  /**
                   * The Content Security Policy used for extension pages.
                   */
                  extension_pages?: string;
                  /**
                   * The Content Security Policy used for content scripts.
                   */
                  content_scripts?: string;
                  /**
                   * An alias for content_scripts to support Chrome compatibility.  Content Security Policy implementations may differ between Firefox and Chrome.  If both isolated_world and content_scripts exist, the value from content_scripts will be used.
                   */
                  isolated_world?: string;
              };
        permissions?: PermissionOrOrigin[];
        optional_permissions?: OptionalPermissionOrOrigin[];
        web_accessible_resources?: string[];
        developer?: {
            name?: string;
            url?: string;
        };
        hidden?: boolean;
    }

    /**
     * Represents a WebExtension language pack manifest.json file
     */
    interface WebExtensionLangpackManifest {
        homepage_url?: string;
        langpack_id: string;
        languages: /* "unknown" undefined */ object;
        sources?: /* "unknown" undefined */ object;
    }

    /**
     * Represents a WebExtension dictionary manifest.json file
     */
    interface WebExtensionDictionaryManifest {
        homepage_url?: string;
        dictionaries: /* "unknown" undefined */ object;
    }

    interface ThemeIcons {
        /**
         * A light icon to use for dark themes
         */
        light: ExtensionURL;
        /**
         * The dark icon to use for light themes
         */
        dark: ExtensionURL;
        /**
         * The size of the icons
         */
        size: number;
    }

    /* skipped: OptionalPermissionNoPrompt: undefined */
    type OptionalPermissionNoPrompt = 'idle';
    /* skipped: OptionalPermission: undefined */
    type OptionalPermission =
        | OptionalPermissionNoPrompt
        | 'clipboardRead'
        | 'clipboardWrite'
        | 'geolocation'
        | 'notifications';
    /* skipped: OptionalPermissionOrOrigin: undefined */
    type OptionalPermissionOrOrigin = OptionalPermission | MatchPattern;
    /* skipped: PermissionNoPrompt: undefined */
    type PermissionNoPrompt =
        | OptionalPermission
        | 'alarms'
        | 'mozillaAddons'
        | 'storage'
        | 'unlimitedStorage';
    /* skipped: Permission: undefined */
    type Permission = PermissionNoPrompt | OptionalPermission;
    /* skipped: PermissionOrOrigin: undefined */
    type PermissionOrOrigin = Permission | MatchPattern;
    type HttpURL = string;
    type ExtensionURL = string;
    type ExtensionFileUrl = string;
    type ImageDataOrExtensionURL = string;
    /* skipped: ExtensionID: undefined */
    type ExtensionID = string | string;
    interface FirefoxSpecificProperties {
        id?: ExtensionID;
        update_url?: string;
        strict_min_version?: string;
        strict_max_version?: string;
    }

    /* skipped: MatchPattern: undefined */
    type MatchPattern =
        | '<all_urls>'
        | MatchPatternRestricted
        | MatchPatternUnestricted;
    /**
     * Same as MatchPattern above, but excludes <all_urls>
     */
    /* skipped: MatchPatternRestricted: undefined */
    type MatchPatternRestricted = string | string;
    /**
     * Mostly unrestricted match patterns for privileged add-ons. This should technically be rejected for unprivileged add-ons, but, reasons. The MatchPattern class will still refuse privileged schemes for those extensions.
     */
    /* skipped: MatchPatternUnestricted: undefined */
    type MatchPatternUnestricted = string;
    /**
     * Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time. Based on InjectDetails, but using underscore rather than camel case naming conventions.
     */
    interface ContentScript {
        matches: MatchPattern[];
        exclude_matches?: MatchPattern[];
        include_globs?: string[];
        exclude_globs?: string[];
        /**
         * The list of CSS files to inject
         */
        css?: ExtensionURL[];
        /**
         * The list of JS files to inject
         */
        js?: ExtensionURL[];
        /**
         * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
         */
        all_frames?: boolean;
        /**
         * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
         */
        match_about_blank?: boolean;
        /**
         * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
         */
        run_at?: /* lookup type? "extensionTypes.RunAt" */ extensionTypes.RunAt;
    }

    /* skipped: IconPath: undefined */
    type IconPath = /* "unknown" undefined */ object | ExtensionFileUrl;
    /* skipped: IconImageData: undefined */
    type IconImageData = /* "unknown" undefined */ object | ImageData;
    interface ImageData {}

    /* skipped: UnrecognizedProperty: any */
    type UnrecognizedProperty = any;
    /* skipped: PersistentBackgroundProperty: undefined */
    type PersistentBackgroundProperty = boolean | boolean;
    /**
     * Represents a protocol handler definition.
     */
    interface ProtocolHandler {
        /**
         * A user-readable title string for the protocol handler. This will be displayed to the user in interface objects as needed.
         */
        name: string;
        /**
         * The protocol the site wishes to handle, specified as a string. For example, you can register to handle SMS text message links by registering to handle the "sms" scheme.
         */
        protocol:
            | 'bitcoin'
            | 'dat'
            | 'dweb'
            | 'geo'
            | 'gopher'
            | 'im'
            | 'ipfs'
            | 'ipns'
            | 'irc'
            | 'ircs'
            | 'magnet'
            | 'mailto'
            | 'mms'
            | 'news'
            | 'nntp'
            | 'sip'
            | 'sms'
            | 'smsto'
            | 'ssb'
            | 'ssh'
            | 'tel'
            | 'urn'
            | 'webcal'
            | 'wtai'
            | 'xmpp'
            | string;
        /**
         * The URL of the handler, as a string. This string should include "%s" as a placeholder which will be replaced with the escaped URL of the document to be handled. This URL might be a true URL, or it could be a phone number, email address, or so forth.
         */
        uriTemplate: ExtensionURL | HttpURL;
    }

    /* skipped: ThemeColor: undefined */
    type ThemeColor = string | number[] | number[];
    interface ThemeExperiment {
        stylesheet?: ExtensionURL;
        images?: /* "unknown" undefined */ object;
        colors?: /* "unknown" undefined */ object;
        properties?: /* "unknown" undefined */ object;
    }

    interface ThemeType {
        images?: {
            additional_backgrounds?: ImageDataOrExtensionURL[];
            headerURL?: ImageDataOrExtensionURL;
            theme_frame?: ImageDataOrExtensionURL;
        };
        colors?: {
            tab_selected?: ThemeColor;
            accentcolor?: ThemeColor;
            frame?: ThemeColor;
            frame_inactive?: ThemeColor;
            textcolor?: ThemeColor;
            tab_background_text?: ThemeColor;
            tab_background_separator?: ThemeColor;
            tab_loading?: ThemeColor;
            tab_text?: ThemeColor;
            tab_line?: ThemeColor;
            toolbar?: ThemeColor;
            /**
             * This color property is an alias of 'bookmark_text'.
             */
            toolbar_text?: ThemeColor;
            bookmark_text?: ThemeColor;
            toolbar_field?: ThemeColor;
            toolbar_field_text?: ThemeColor;
            toolbar_field_border?: ThemeColor;
            toolbar_field_separator?: ThemeColor;
            toolbar_top_separator?: ThemeColor;
            toolbar_bottom_separator?: ThemeColor;
            toolbar_vertical_separator?: ThemeColor;
            icons?: ThemeColor;
            icons_attention?: ThemeColor;
            button_background_hover?: ThemeColor;
            button_background_active?: ThemeColor;
            popup?: ThemeColor;
            popup_text?: ThemeColor;
            popup_border?: ThemeColor;
            toolbar_field_focus?: ThemeColor;
            toolbar_field_text_focus?: ThemeColor;
            toolbar_field_border_focus?: ThemeColor;
            popup_highlight?: ThemeColor;
            popup_highlight_text?: ThemeColor;
            ntp_background?: ThemeColor;
            ntp_text?: ThemeColor;
            sidebar?: ThemeColor;
            sidebar_border?: ThemeColor;
            sidebar_text?: ThemeColor;
            sidebar_highlight?: ThemeColor;
            sidebar_highlight_text?: ThemeColor;
            toolbar_field_highlight?: ThemeColor;
            toolbar_field_highlight_text?: ThemeColor;
        };
        properties?: {
            additional_backgrounds_alignment?:
                | 'bottom'
                | 'center'
                | 'left'
                | 'right'
                | 'top'
                | 'center bottom'
                | 'center center'
                | 'center top'
                | 'left bottom'
                | 'left center'
                | 'left top'
                | 'right bottom'
                | 'right center'
                | 'right top'[];
            additional_backgrounds_tiling?:
                | 'no-repeat'
                | 'repeat'
                | 'repeat-x'
                | 'repeat-y'[];
        };
    }

    /**
     * Contents of manifest.json for a static theme
     */
    interface ThemeManifest {
        theme: ThemeType;
        dark_theme?: ThemeType;
        default_locale?: string;
        theme_experiment?: ThemeExperiment;
        icons?: /* "unknown" undefined */ object;
    }

    type KeyName = string;
}

/**
 * Use a messageDisplayAction to put an icon in the message display toolbar. In addition to its icon, a messageDisplayAction can also have a tooltip, a badge, and a popup.
 */
declare namespace browser.messageDisplayAction {
    /**
     * Specifies to which tab or window the value should be set, or from which one it should be retrieved. If no tab nor window is specified, the global value is set or retrieved.
     */
    interface Details {
        /**
         * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
         */
        tabId?: number;
        /**
         * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
         */
        windowId?: number;
    }

    /**
     * An array of four integers in the range [0,255] that make up the RGBA color. For example, opaque red is `[255, 0, 0, 255]`.
     */
    /* skipped: ColorArray: array */
    type ColorArray = number[];
    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a `canvas` element).
     */
    interface ImageDataType {}

    /**
     * A ``{size: ImageDataType}`` dictionary representing the icon to be set. The actual :ref:`messageDisplayAction.ImageDataType` to be used is chosen depending on the screen's pixel density. See the `MDN documentation on browser styles <https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_styles>`__ for more information on this. At least one :ref:`messageDisplayAction.ImageDataType` must be specified.
     */
    interface ImageDataDictionary {}

    /**
     * Information sent when a message display action is clicked.
     */
    interface OnClickData {
        /**
         * An array of keyboard modifiers that were held while the menu item was clicked.
         */
        modifiers: 'Shift' | 'Alt' | 'Command' | 'Ctrl' | 'MacCtrl'[];
        /**
         * An integer value of button by which menu item was clicked.
         */
        button?: number;
    }

    /**
     * Sets the title of the messageDisplayAction. This shows up in the tooltip and the label. Defaults to the add-on name.
     */
    function setTitle(details: {
        /**
         * The string the messageDisplayAction should display as its label and when moused over.
         */
        title: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the title of the messageDisplayAction.
     */
    function getTitle(details: Details): Promise<string>;
    /**
     * Sets the label of the messageDisplayAction, defaults to its title. Can be set to an empty string to not display any label. If the containing toolbar is configured to display text only, the title will be used as fallback.
     */
    function setLabel(details: {
        /**
         * The string the messageDisplayAction should use as label. Can be set to an empty string to not display any label. If the containing toolbar is configured to display text only, the title will be used as fallback.
         */
        label: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the label of the messageDisplayAction.
     */
    function getLabel(details: Details): Promise<string>;
    /**
     * Sets the icon for the messageDisplayAction. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    function setIcon(details: {
        /**
         * Either an ImageDataType object defining a single icon used for all sizes or an ImageDataDictionary object defining dedicated icons for different sizes.
         */
        imageData?: ImageDataType | ImageDataDictionary;
        /**
         * Either a relative image path defining a single icon used for all sizes or an IconPathDictionary object defining dedicated icons for different sizes.
         */
        path?:
            | string
            | /* lookup type? "manifest.IconPath" */ manifest.IconPath;
    }): Promise<void>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the messageDisplayAction's icon.
     */
    function setPopup(details: {
        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup is shown.
         */
        popup: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the html document set as the popup for this messageDisplayAction.
     */
    function getPopup(details: Details): Promise<string>;
    /**
     * Sets the badge text for the messageDisplayAction. The badge is displayed on top of the icon.
     */
    function setBadgeText(details: {
        /**
         * Any number of characters can be passed, but only about four can fit in the space.
         */
        text: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the badge text of the messageDisplayAction. If no tab nor window is specified, the global badge text is returned.
     */
    function getBadgeText(details: Details): Promise<string>;
    /**
     * Sets the background color for the badge.
     */
    function setBadgeBackgroundColor(details: {
        /**
         * An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color:
            | string
            | ColorArray
            | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the background color of the messageDisplayAction.
     */
    function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
    /**
     * Enables the messageDisplayAction for a tab. By default, a messageDisplayAction is enabled.
     */
    function enable(
        /**
         * The id of the tab for which you want to modify the messageDisplayAction.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Disables the messageDisplayAction for a tab.
     */
    function disable(
        /**
         * The id of the tab for which you want to modify the messageDisplayAction.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Checks whether the messageDisplayAction is enabled.
     */
    function isEnabled(details: Details): Promise<boolean>;
    /**
     * Opens the extension popup window in the active window.
     */
    function openPopup(): Promise<any>;
    const /* 1 of 1 */ onClicked: EventHandler</**
         * Fired when a messageDisplayAction icon is clicked.  This event will not fire if the messageDisplayAction has a popup. This is a user input event handler. For asynchronous listeners some `restrictions <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/User_actions>`__ apply.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            info?: OnClickData
        ) => void>;
}

declare namespace browser.messageDisplay {
    /**
     * Gets the currently displayed message in the specified tab. It returns null if no messages are displayed, or if multiple messages are displayed.
     */
    function getDisplayedMessage(
        tabId: number
    ): Promise</* lookup type? "messages.MessageHeader" */ messages.MessageHeader | void /* could not determine correct type */>;
    /**
     * Gets an array of the currently displayed messages in the specified tab. The array is empty if no messages are displayed.
     */
    function getDisplayedMessages(
        tabId: number
    ): Promise</* z8array */ messages.MessageHeader[]>;
    const /* 1 of 2 */ onMessageDisplayed: EventHandler</**
         * Fired when a message is displayed, whether in a 3-pane tab, a message tab, or a message window.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            message: /* lookup type? "messages.MessageHeader" */ messages.MessageHeader
        ) => void>;
    const /* 2 of 2 */ onMessagesDisplayed: EventHandler</**
         * Fired when either a single message is displayed or when multiple messages are displayed, whether in a 3-pane tab, a message tab, or a message window.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            messages: /* z8array */ messages.MessageHeader[]
        ) => void>;
}

declare namespace browser.theme {
    /**
     * Info provided in the onUpdated listener.
     */
    interface ThemeUpdateInfo {
        /**
         * The new theme after update
         */
        theme: /* "unknown" undefined */ object;
        /**
         * The id of the window the theme has been applied to
         */
        windowId?: number;
    }

    /**
     * Returns the current theme for the specified window or the last focused window.
     */
    function getCurrent(
        /**
         * The window for which we want the theme.
         */ windowId?: number
    ): Promise<any>;
    /**
     * Make complete updates to the theme. Resolves when the update has completed.
     */
    function update(
        /**
         * The id of the window to update. No id updates all windows.
         */ windowId: number,
        /**
         * The properties of the theme to update.
         */ details: /* lookup type? "manifest.ThemeType" */ manifest.ThemeType
    ): Promise<any>;
    function update(
        /**
         * The properties of the theme to update.
         */ details: /* lookup type? "manifest.ThemeType" */ manifest.ThemeType
    ): Promise<any>;
    /**
     * Removes the updates made to the theme.
     */
    function reset(
        /**
         * The id of the window to reset. No id resets all windows.
         */ windowId?: number
    ): Promise<any>;
    /**
     * Returns the current theme for the specified window or the last focused window.
     */
    function getCurrent(
        /**
         * The window for which we want the theme.
         */ windowId?: number
    ): Promise<ThemeType>;
    /**
     * Make complete updates to the theme. Resolves when the update has completed.
     */
    function update(
        /**
         * The id of the window to update. No id updates all windows.
         */ windowId: number,
        /**
         * The properties of the theme to update.
         */ details: /* lookup type? "manifest.ThemeType" */ manifest.ThemeType
    ): Promise<any>;
    function update(
        /**
         * The properties of the theme to update.
         */ details: /* lookup type? "manifest.ThemeType" */ manifest.ThemeType
    ): Promise<any>;
    /**
     * Removes the updates made to the theme.
     */
    function reset(
        /**
         * The id of the window to reset. No id resets all windows.
         */ windowId?: number
    ): Promise<any>;
    const /* 1 of 1 */ onUpdated: EventHandler</**
         * Fired when a new theme has been applied
         */
        (
            /**
             * Details of the theme update
             */

            updateInfo: ThemeUpdateInfo
        ) => void>;
}

/**
 * Use the `chrome.sessions` API to query and restore tabs and windows from a browsing session.
 */
declare namespace browser.sessions {
    interface Filter {
        /**
         * The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ($(ref:sessions.MAX_SESSION_RESULTS)).
         */
        maxResults?: number;
    }

    interface Session {
        /**
         * The time when the window or tab was closed or modified, represented in milliseconds since the epoch.
         */
        lastModified: number;
        /**
         * The $(ref:tabs.Tab), if this entry describes a tab. Either this or $(ref:sessions.Session.window) will be set.
         */
        tab?: /* lookup type? "tabs.Tab" */ tabs.Tab;
        /**
         * The $(ref:windows.Window), if this entry describes a window. Either this or $(ref:sessions.Session.tab) will be set.
         */
        window?: /* lookup type? "windows.Window" */ windows.Window;
    }

    interface Device {
        info: string;
        /**
         * The name of the foreign device.
         */
        deviceName: string;
        /**
         * A list of open window sessions for the foreign device, sorted from most recently to least recently modified session.
         */
        sessions: Session[];
    }

    /**
     * Forget a recently closed tab.
     */
    function forgetClosedTab(
        /**
         * The windowId of the window to which the recently closed tab to be forgotten belongs.
         */ windowId: number,
        /**
         * The sessionId (closedId) of the recently closed tab to be forgotten.
         */ sessionId: string
    ): Promise<any>;
    /**
     * Forget a recently closed window.
     */
    function forgetClosedWindow(
        /**
         * The sessionId (closedId) of the recently closed window to be forgotten.
         */ sessionId: string
    ): Promise<any>;
    /**
     * Gets the list of recently closed tabs and/or windows.
     */
    function getRecentlyClosed(filter?: Filter): Promise<Session[]>;
    /**
     * Retrieves all devices with synced sessions.
     */
    function getDevices(filter?: Filter): Promise<Device[]>;
    /**
     * Reopens a $(ref:windows.Window) or $(ref:tabs.Tab), with an optional callback to run when the entry has been restored.
     */
    function restore(
        /**
         * The $(ref:windows.Window.sessionId), or $(ref:tabs.Tab.sessionId) to restore. If this parameter is not specified, the most recently closed session is restored.
         */ sessionId?: string
    ): Promise<Session>;
    /**
     * Set a key/value pair on a given tab.
     */
    function setTabValue(
        /**
         * The id of the tab that the key/value pair is being set on.
         */ tabId: number,
        /**
         * The key which corresponds to the value being set.
         */ key: string,
        /**
         * The value being set.
         */ value: any
    ): Promise<any>;
    /**
     * Retrieve a value that was set for a given key on a given tab.
     */
    function getTabValue(
        /**
         * The id of the tab whose value is being retrieved from.
         */ tabId: number,
        /**
         * The key which corresponds to the value.
         */ key: string
    ): Promise<any>;
    /**
     * Remove a key/value pair that was set on a given tab.
     */
    function removeTabValue(
        /**
         * The id of the tab whose key/value pair is being removed.
         */ tabId: number,
        /**
         * The key which corresponds to the value.
         */ key: string
    ): Promise<any>;
    /**
     * Set a key/value pair on a given window.
     */
    function setWindowValue(
        /**
         * The id of the window that the key/value pair is being set on.
         */ windowId: number,
        /**
         * The key which corresponds to the value being set.
         */ key: string,
        /**
         * The value being set.
         */ value: any
    ): Promise<any>;
    /**
     * Retrieve a value that was set for a given key on a given window.
     */
    function getWindowValue(
        /**
         * The id of the window whose value is being retrieved from.
         */ windowId: number,
        /**
         * The key which corresponds to the value.
         */ key: string
    ): Promise<any>;
    /**
     * Remove a key/value pair that was set on a given window.
     */
    function removeWindowValue(
        /**
         * The id of the window whose key/value pair is being removed.
         */ windowId: number,
        /**
         * The key which corresponds to the value.
         */ key: string
    ): Promise<any>;
    const /* 1 of 1 */ onChanged: EventHandler</**
         * Fired when recently closed tabs and/or windows are changed. This event does not monitor synced sessions changes.
         */
        () => void>;
    /**
     * The maximum number of $(ref:sessions.Session) that will be included in a requested list.
     */
    const MAX_SESSION_RESULTS = 25;
}

declare namespace browser.browserAction {
    /**
     * Specifies to which tab or window the value should be set, or from which one it should be retrieved. If no tab nor window is specified, the global value is set or retrieved.
     */
    interface Details {
        /**
         * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
         */
        tabId?: number;
        /**
         * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
         */
        windowId?: number;
    }

    /* skipped: ColorArray: array */
    type ColorArray = number[];
    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a `canvas` element).
     */
    interface ImageDataType {}

    /**
     * An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
     */
    /* skipped: ColorValue: undefined */
    type ColorValue =
        | string
        | ColorArray
        | void /* could not determine correct type */;
    /**
     * Information sent when a browser action is clicked.
     */
    interface OnClickData {
        /**
         * An array of keyboard modifiers that were held while the menu item was clicked.
         */
        modifiers: 'Shift' | 'Alt' | 'Command' | 'Ctrl' | 'MacCtrl'[];
        /**
         * An integer value of button by which menu item was clicked.
         */
        button?: number;
    }

    /**
     * A ``{size: ImageDataType}`` dictionary representing the icon to be set. The actual :ref:`browserAction.ImageDataType` to be used is chosen depending on the screen's pixel density. See the `MDN documentation on browser styles <https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_styles>`__ for more information on this. At least one :ref:`browserAction.ImageDataType` must be specified.
     */
    interface ImageDataDictionary {}

    /**
     * Sets the title of the browser action. This shows up in the tooltip.
     */
    function setTitle(details: {
        /**
         * The string the browser action should display when moused over.
         */
        title: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the title of the browser action.
     */
    function getTitle(details: Details): Promise<string>;
    /**
     * Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    function setIcon(details: {
        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
         */
        imageData?: ImageDataType | /* "unknown" undefined */ object;
        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
         */
        path?: string | /* "unknown" undefined */ object;
    }): Promise<void>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
     */
    function setPopup(details: {
        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup is shown.
         */
        popup: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the html document set as the popup for this browser action.
     */
    function getPopup(details: Details): Promise<string>;
    /**
     * Sets the badge text for the browser action. The badge is displayed on top of the icon.
     */
    function setBadgeText(details: {
        /**
         * Any number of characters can be passed, but only about four can fit in the space.
         */
        text: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the badge text of the browser action. If no tab nor window is specified is specified, the global badge text is returned.
     */
    function getBadgeText(details: Details): Promise<string>;
    /**
     * Sets the background color for the badge.
     */
    function setBadgeBackgroundColor(details: {
        color: ColorValue;
    }): Promise<void>;
    /**
     * Gets the background color of the browser action badge.
     */
    function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
    /**
     * Sets the text color for the badge.
     */
    function setBadgeTextColor(details: { color: ColorValue }): Promise<any>;
    /**
     * Gets the text color of the browser action badge.
     */
    function getBadgeTextColor(details: Details): Promise<any>;
    /**
     * Enables the browser action for a tab. By default, browser actions are enabled.
     */
    function enable(
        /**
         * The id of the tab for which you want to modify the browser action.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Disables the browser action for a tab.
     */
    function disable(
        /**
         * The id of the tab for which you want to modify the browser action.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Checks whether the browser action is enabled.
     */
    function isEnabled(details: Details): Promise<any>;
    /**
     * Opens the extension popup window in the active window.
     */
    function openPopup(): Promise<any>;
    /**
     * Sets the title of the browserAction. This shows up in the tooltip and the label. Defaults to the add-on name.
     */
    function setTitle(details: {
        /**
         * The string the browserAction should display as its label and when moused over.
         */
        title: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the title of the browserAction.
     */
    function getTitle(details: Details): Promise<string>;
    /**
     * Sets the label of the browserAction, defaults to its title. Can be set to an empty string to not display any label. If the containing toolbar is configured to display text only, the title will be used as fallback.
     */
    function setLabel(details: {
        /**
         * The string the browserAction should use as label. Can be set to an empty string to not display any label. If the containing toolbar is configured to display text only, the title will be used as fallback.
         */
        label: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the label of the browserAction.
     */
    function getLabel(details: Details): Promise<string>;
    /**
     * Sets the icon for the browserAction. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    function setIcon(details: {
        /**
         * Either an ImageDataType object defining a single icon used for all sizes or an ImageDataDictionary object defining dedicated icons for different sizes.
         */
        imageData?: ImageDataType | ImageDataDictionary;
        /**
         * Either a relative image path defining a single icon used for all sizes or an IconPathDictionary object defining dedicated icons for different sizes.
         */
        path?:
            | string
            | /* lookup type? "manifest.IconPath" */ manifest.IconPath;
    }): Promise<void>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the browserAction's icon.
     */
    function setPopup(details: {
        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup is shown.
         */
        popup: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the html document set as the popup for this browserAction.
     */
    function getPopup(details: Details): Promise<string>;
    /**
     * Sets the badge text for the browserAction. The badge is displayed on top of the icon.
     */
    function setBadgeText(details: {
        /**
         * Any number of characters can be passed, but only about four can fit in the space.
         */
        text: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the badge text of the browserAction. If no tab nor window is specified, the global badge text is returned.
     */
    function getBadgeText(details: Details): Promise<string>;
    /**
     * Sets the background color for the badge.
     */
    function setBadgeBackgroundColor(details: {
        /**
         * An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color:
            | string
            | ColorArray
            | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the background color of the browserAction.
     */
    function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
    /**
     * Enables the browserAction for a tab. By default, a browserAction is enabled.
     */
    function enable(
        /**
         * The id of the tab for which you want to modify the browserAction.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Disables the browserAction for a tab.
     */
    function disable(
        /**
         * The id of the tab for which you want to modify the browserAction.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Checks whether the browserAction is enabled.
     */
    function isEnabled(details: Details): Promise<boolean>;
    /**
     * Opens the extension popup window in the active window.
     */
    function openPopup(): Promise<any>;
    const /* 1 of 1 */ onClicked: EventHandler</**
         * Fired when a browser action icon is clicked.  This event will not fire if the browser action has a popup.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            info?: OnClickData
        ) => void>;
}

declare namespace browser.mailTabs {
    interface MailTab {
        id: number;
        windowId: number;
        active: boolean;
        /**
         * Note: ``sortType`` and ``sortOrder`` depend on each other, so both should be present, or neither.
         */
        sortType?:
            | 'none'
            | 'date'
            | 'subject'
            | 'author'
            | 'id'
            | 'thread'
            | 'priority'
            | 'status'
            | 'size'
            | 'flagged'
            | 'unread'
            | 'recipient'
            | 'location'
            | 'tags'
            | 'junkStatus'
            | 'attachments'
            | 'account'
            | 'custom'
            | 'received'
            | 'correspondent';
        /**
         * Note: ``sortType`` and ``sortOrder`` depend on each other, so both should be present, or neither.
         */
        sortOrder?: 'none' | 'ascending' | 'descending';
        viewType?: 'ungrouped' | 'groupedByThread' | 'groupedBySortType';
        layout: 'standard' | 'wide' | 'vertical';
        folderPaneVisible?: boolean;
        messagePaneVisible?: boolean;
        /**
         * The <permission>accountsRead</permission> permission is required for this property to be included.
         */
        displayedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
    }

    interface QuickFilterTextDetail {
        /**
         * String to match against the <var>recipients</var>, <var>author</var>, <var>subject</var>, or <var>body</var>.
         */
        text: string;
        /**
         * Shows messages where <var>text</var> matches the recipients.
         */
        recipients?: boolean;
        /**
         * Shows messages where <var>text</var> matches the author.
         */
        author?: boolean;
        /**
         * Shows messages where <var>text</var> matches the subject.
         */
        subject?: boolean;
        /**
         * Shows messages where <var>text</var> matches the message body.
         */
        body?: boolean;
    }

    /**
     * Gets all mail tabs that have the specified properties, or all mail tabs if no properties are specified.
     */
    function query(queryInfo: {
        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean;
        /**
         * Whether the tabs are in the current window.
         */
        currentWindow?: boolean;
        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean;
        /**
         * The ID of the parent window, or :ref:`windows.WINDOW_ID_CURRENT` for the current window.
         */
        windowId?: number;
    }): Promise<MailTab[]>;
    /**
     * Get the properties of a mail tab.
     */
    function get(
        /**
         * ID of the requested mail tab. Throws if the requested tab is not a mail tab.
         */ tabId: number
    ): Promise<MailTab>;
    /**
     * Get the properties of the active mail tab, if the active tab is a mail tab. Returns undefined otherwise.
     */
    function getCurrent(): Promise<MailTab>;
    /**
     * Modifies the properties of a mail tab. Properties that are not specified in <var>updateProperties</var> are not modified.
     */
    function update(
        /**
         * Defaults to the active tab of the current window.
         */ tabId: number,
        updateProperties: {
            /**
             * Sets the folder displayed in the tab. The extension must have the <permission>accountsRead</permission> permission to do this.
             */
            displayedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
            /**
             * Sorts the list of messages. <var>sortOrder</var> must also be given.
             */
            sortType?:
                | 'none'
                | 'date'
                | 'subject'
                | 'author'
                | 'id'
                | 'thread'
                | 'priority'
                | 'status'
                | 'size'
                | 'flagged'
                | 'unread'
                | 'recipient'
                | 'location'
                | 'tags'
                | 'junkStatus'
                | 'attachments'
                | 'account'
                | 'custom'
                | 'received'
                | 'correspondent';
            /**
             * Sorts the list of messages. <var>sortType</var> must also be given.
             */
            sortOrder?: 'none' | 'ascending' | 'descending';
            viewType?: 'ungrouped' | 'groupedByThread' | 'groupedBySortType';
            /**
             * Sets the arrangement of the folder pane, message list pane, and message display pane. Note that setting this applies it to all mail tabs.
             */
            layout?: 'standard' | 'wide' | 'vertical';
            /**
             * Shows or hides the folder pane.
             */
            folderPaneVisible?: boolean;
            /**
             * Shows or hides the message display pane.
             */
            messagePaneVisible?: boolean;
        }
    ): Promise<any>;
    function update(updateProperties: {
        /**
         * Sets the folder displayed in the tab. The extension must have the <permission>accountsRead</permission> permission to do this.
         */
        displayedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        /**
         * Sorts the list of messages. <var>sortOrder</var> must also be given.
         */
        sortType?:
            | 'none'
            | 'date'
            | 'subject'
            | 'author'
            | 'id'
            | 'thread'
            | 'priority'
            | 'status'
            | 'size'
            | 'flagged'
            | 'unread'
            | 'recipient'
            | 'location'
            | 'tags'
            | 'junkStatus'
            | 'attachments'
            | 'account'
            | 'custom'
            | 'received'
            | 'correspondent';
        /**
         * Sorts the list of messages. <var>sortType</var> must also be given.
         */
        sortOrder?: 'none' | 'ascending' | 'descending';
        viewType?: 'ungrouped' | 'groupedByThread' | 'groupedBySortType';
        /**
         * Sets the arrangement of the folder pane, message list pane, and message display pane. Note that setting this applies it to all mail tabs.
         */
        layout?: 'standard' | 'wide' | 'vertical';
        /**
         * Shows or hides the folder pane.
         */
        folderPaneVisible?: boolean;
        /**
         * Shows or hides the message display pane.
         */
        messagePaneVisible?: boolean;
    }): Promise<any>;
    /**
     * Lists the selected messages in the current folder.
     */
    function getSelectedMessages(
        /**
         * Defaults to the active tab of the current window.
         */ tabId?: number
    ): Promise</* lookup type? "messages.MessageList" */ messages.MessageList>;
    /**
     * Sets the Quick Filter user interface based on the options specified.
     */
    function setQuickFilter(
        /**
         * Defaults to the active tab of the current window.
         */ tabId: number,
        properties: {
            /**
             * Shows or hides the Quick Filter bar.
             */
            show?: boolean;
            /**
             * Shows only unread messages.
             */
            unread?: boolean;
            /**
             * Shows only flagged messages.
             */
            flagged?: boolean;
            /**
             * Shows only messages from people in the address book.
             */
            contact?: boolean;
            /**
             * Shows only messages with tags on them.
             */
            tags?:
                | boolean
                | /* lookup type? "messages.TagsDetail" */ messages.TagsDetail;
            /**
             * Shows only messages with attachments.
             */
            attachment?: boolean;
            /**
             * Shows only messages matching the supplied text.
             */
            text?: QuickFilterTextDetail;
        }
    ): Promise<any>;
    function setQuickFilter(properties: {
        /**
         * Shows or hides the Quick Filter bar.
         */
        show?: boolean;
        /**
         * Shows only unread messages.
         */
        unread?: boolean;
        /**
         * Shows only flagged messages.
         */
        flagged?: boolean;
        /**
         * Shows only messages from people in the address book.
         */
        contact?: boolean;
        /**
         * Shows only messages with tags on them.
         */
        tags?:
            | boolean
            | /* lookup type? "messages.TagsDetail" */ messages.TagsDetail;
        /**
         * Shows only messages with attachments.
         */
        attachment?: boolean;
        /**
         * Shows only messages matching the supplied text.
         */
        text?: QuickFilterTextDetail;
    }): Promise<any>;
    const /* 1 of 2 */ onDisplayedFolderChanged: EventHandler</**
         * Fired when the displayed folder changes in any mail tab.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            displayedFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
        ) => void>;
    const /* 2 of 2 */ onSelectedMessagesChanged: EventHandler</**
         * Fired when the selected messages change in any mail tab.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            selectedMessages: /* lookup type? "messages.MessageList" */ messages.MessageList
        ) => void>;
}

/**
 * Use a composeAction to put an icon in the message composition toolbars. In addition to its icon, a composeAction can also have a tooltip, a badge, and a popup.
 */
declare namespace browser.composeAction {
    /**
     * Specifies to which tab or window the value should be set, or from which one it should be retrieved. If no tab nor window is specified, the global value is set or retrieved.
     */
    interface Details {
        /**
         * When setting a value, it will be specific to the specified tab, and will automatically reset when the tab navigates. When getting, specifies the tab to get the value from; if there is no tab-specific value, the window one will be inherited.
         */
        tabId?: number;
        /**
         * When setting a value, it will be specific to the specified window. When getting, specifies the window to get the value from; if there is no window-specific value, the global one will be inherited.
         */
        windowId?: number;
    }

    /**
     * An array of four integers in the range [0,255] that make up the RGBA color. For example, opaque red is `[255, 0, 0, 255]`.
     */
    /* skipped: ColorArray: array */
    type ColorArray = number[];
    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a `canvas` element).
     */
    interface ImageDataType {}

    /**
     * A ``{size: ImageDataType}`` dictionary representing the icon to be set. The actual :ref:`composeAction.ImageDataType` to be used is chosen depending on the screen's pixel density. See the `MDN documentation on browser styles <https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_styles>`__ for more information on this. At least one :ref:`composeAction.ImageDataType` must be specified.
     */
    interface ImageDataDictionary {}

    /**
     * Information sent when a compose action is clicked.
     */
    interface OnClickData {
        /**
         * An array of keyboard modifiers that were held while the menu item was clicked.
         */
        modifiers: 'Shift' | 'Alt' | 'Command' | 'Ctrl' | 'MacCtrl'[];
        /**
         * An integer value of button by which menu item was clicked.
         */
        button?: number;
    }

    /**
     * Sets the title of the composeAction. This shows up in the tooltip and the label. Defaults to the add-on name.
     */
    function setTitle(details: {
        /**
         * The string the composeAction should display as its label and when moused over.
         */
        title: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the title of the composeAction.
     */
    function getTitle(details: Details): Promise<string>;
    /**
     * Sets the label of the composeAction, defaults to its title. Can be set to an empty string to not display any label. If the containing toolbar is configured to display text only, the title will be used as fallback.
     */
    function setLabel(details: {
        /**
         * The string the composeAction should use as label. Can be set to an empty string to not display any label. If the containing toolbar is configured to display text only, the title will be used as fallback.
         */
        label: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the label of the composeAction.
     */
    function getLabel(details: Details): Promise<string>;
    /**
     * Sets the icon for the composeAction. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    function setIcon(details: {
        /**
         * Either an ImageDataType object defining a single icon used for all sizes or an ImageDataDictionary object defining dedicated icons for different sizes.
         */
        imageData?: ImageDataType | ImageDataDictionary;
        /**
         * Either a relative image path defining a single icon used for all sizes or an IconPathDictionary object defining dedicated icons for different sizes.
         */
        path?:
            | string
            | /* lookup type? "manifest.IconPath" */ manifest.IconPath;
    }): Promise<void>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the composeAction's icon.
     */
    function setPopup(details: {
        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup is shown.
         */
        popup: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the html document set as the popup for this composeAction.
     */
    function getPopup(details: Details): Promise<string>;
    /**
     * Sets the badge text for the composeAction. The badge is displayed on top of the icon.
     */
    function setBadgeText(details: {
        /**
         * Any number of characters can be passed, but only about four can fit in the space.
         */
        text: string | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the badge text of the composeAction. If no tab nor window is specified, the global badge text is returned.
     */
    function getBadgeText(details: Details): Promise<string>;
    /**
     * Sets the background color for the badge.
     */
    function setBadgeBackgroundColor(details: {
        /**
         * An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color:
            | string
            | ColorArray
            | void /* could not determine correct type */;
    }): Promise<void>;
    /**
     * Gets the background color of the composeAction.
     */
    function getBadgeBackgroundColor(details: Details): Promise<ColorArray>;
    /**
     * Enables the composeAction for a tab. By default, a composeAction is enabled.
     */
    function enable(
        /**
         * The id of the tab for which you want to modify the composeAction.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Disables the composeAction for a tab.
     */
    function disable(
        /**
         * The id of the tab for which you want to modify the composeAction.
         */ tabId?: number
    ): Promise<void>;
    /**
     * Checks whether the composeAction is enabled.
     */
    function isEnabled(details: Details): Promise<boolean>;
    /**
     * Opens the extension popup window in the active window.
     */
    function openPopup(): Promise<any>;
    const /* 1 of 1 */ onClicked: EventHandler</**
         * Fired when a composeAction icon is clicked.  This event will not fire if the composeAction has a popup. This is a user input event handler. For asynchronous listeners some `restrictions <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/User_actions>`__ apply.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            info?: OnClickData
        ) => void>;
}

declare namespace browser.identities {
    interface MailIdentity {
        /**
         * The id of the :ref:`accounts.MailAccount` this identity belongs to. The ``accountId`` property is read-only.
         */
        accountId?: string;
        /**
         * If the identity uses HTML as the default compose format.
         */
        composeHtml?: boolean;
        /**
         * The user's email address as used when messages are sent from this identity.
         */
        email?: string;
        /**
         * A unique identifier for this identity. The ``id`` property is read-only.
         */
        id?: string;
        /**
         * A user-defined label for this identity.
         */
        label?: string;
        /**
         * The user's name as used when messages are sent from this identity.
         */
        name?: string;
        /**
         * The reply-to email address associated with this identity.
         */
        replyTo?: string;
        /**
         * The organization associated with this identity.
         */
        organization?: string;
        /**
         * The signature of the identity.
         */
        signature?: string;
        /**
         * If the signature should be interpreted as plain text or as HTML.
         */
        signatureIsPlainText?: boolean;
    }

    /**
     * Returns the identities of the specified account, or all identities if no account is specified. Do not expect the returned identities to be in any specific order. Use :ref:`identities.getDefault` to get the default identity of an account.
     */
    function list(
        accountId?: string
    ): Promise</* z8array */ identities.MailIdentity[]>;
    /**
     * Returns details of the requested identity, or null if it doesn't exist.
     */
    function get(
        identityId: string
    ): Promise<
        /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    >;
    /**
     * Create a new identity in the specified account.
     */
    function create(
        accountId: string,
        details: /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    ): Promise<
        /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    >;
    /**
     * Updates the details of an identity.
     */
    function update(
        identityId: string,
        details: /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    ): Promise<
        /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    >;
    /**
     * Returns the default identity for the requested account, or null if it is not defined.
     */
    function getDefault(
        accountId: string
    ): Promise<
        /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    >;
    /**
     * Sets the default identity for the requested account.
     */
    function setDefault(accountId: string, identityId: string): Promise<any>;
    const /* 1 of 3 */ onCreated: EventHandler</**
         * Fired when a new identity has been created and added to an account. The event also fires for default identities that are created when a new account is added.
         */
        (identityId: string, identity: MailIdentity) => void>;
    const /* 2 of 3 */ onDeleted: EventHandler</**
         * Fired when an identity has been removed from an account.
         */
        (identityId: string) => void>;
    const /* 3 of 3 */ onUpdated: EventHandler</**
         * Fired when one or more properties of an identity have been modified. The returned :ref:`identities.MailIdentity` includes only the changed values.
         */
        (identityId: string, changedValues: MailIdentity) => void>;
}

declare namespace browser.messages {
    /**
     * Basic information about a message.
     */
    interface MessageHeader {
        author: string;
        /**
         * The Bcc recipients. Not populated for news/nntp messages.
         */
        bccList: string[];
        /**
         * The Cc recipients. Not populated for news/nntp messages.
         */
        ccList: string[];
        date: /* lookup type? "extensionTypes.Date" */ extensionTypes.Date;
        flagged: boolean;
        /**
         * The <permission>accountsRead</permission> permission is required for this property to be included.
         */
        folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        /**
         * The message-id header of the message.
         */
        headerMessageId: string;
        id: number;
        /**
         * Not populated for news/nntp messages.
         */
        junk: boolean;
        junkScore: number;
        read: boolean;
        /**
         * The To recipients. Not populated for news/nntp messages.
         */
        recipients: string[];
        /**
         * The total size of the message in bytes.
         */
        size: number;
        subject: string;
        tags: string[];
    }

    /**
     * See :doc:`how-to/messageLists` for more information.
     */
    interface MessageList {
        id?: string;
        messages: MessageHeader[];
    }

    /**
     * Represents an email message "part", which could be the whole message
     */
    interface MessagePart {
        /**
         * The content of the part
         */
        body?: string;
        contentType?: string;
        /**
         * An object of part headers, with the header name as key, and an array of header values as value
         */
        headers?: /* "unknown" undefined */ object;
        /**
         * Name of the part, if it is a file
         */
        name?: string;
        partName?: string;
        /**
         * Any sub-parts of this part
         */
        parts?: MessagePart[];
        size?: number;
    }

    /**
     * Message properties that can be updated by the :ref:`messages.update` and that are monitored by :ref:`messages.onUpdated`.
     */
    interface MessageChangeProperties {
        /**
         * Message is read.
         */
        read?: boolean;
        /**
         * Message is junk.
         */
        junk?: boolean;
        /**
         * Message is flagged.
         */
        flagged?: boolean;
        /**
         * Tags associated with this message. For a list of available tags, call the listTags method.
         */
        tags?: string[];
    }

    interface MessageTag {
        /**
         * Distinct tag identifier – use this string when referring to a tag
         */
        key: string;
        /**
         * Human-readable tag name
         */
        tag: string;
        /**
         * Tag color
         */
        color: string;
        /**
         * Custom sort string (usually empty)
         */
        ordinal: string;
    }

    /**
     * Used for filtering messages by tag in various methods. Note that functions using this type may have a partial implementation.
     */
    interface TagsDetail {
        /**
         * Object keys are tags to filter on, values are `true` if the message must have the tag, or `false` if it must not have the tag. For a list of available tags, call the :ref:`messages.listTags` method.
         */
        tags: /* "unknown" undefined */ object;
        /**
         * Whether all of the tag filters must apply, or any of them.
         */
        mode: 'all' | 'any';
    }

    /**
     * Represents an attachment in a message.
     */
    interface Attachment {
        /**
         * The content type of the attachment.
         */
        contentType: string;
        /**
         * The name, as displayed to the user, of this attachment. This is usually but not always the filename of the attached file.
         */
        name: string;
        /**
         * Identifies the MIME part of the message associated with this attachment.
         */
        partName: string;
        /**
         * The size in bytes of this attachment.
         */
        size: number;
    }

    /**
     * Gets all messages in a folder.
     */
    function list(
        folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
    ): Promise<MessageList>;
    /**
     * Returns the next chunk of messages in a list. See :doc:`how-to/messageLists` for more information.
     */
    function continueList(messageListId: string): Promise<MessageList>;
    /**
     * Returns a specified message.
     */
    function get(messageId: number): Promise<MessageHeader>;
    /**
     * Returns a specified message, including all headers and MIME parts.
     */
    function getFull(messageId: number): Promise<MessagePart>;
    /**
   * Returns the unmodified source of a message as a `binary string <https://developer.mozilla.org/en-US/docs/Web/API/DOMString/Binary>`__, which is a simple series of 8-bit values. If the message contains non-ASCII characters, the body parts in the binary string cannot be read directly and must be decoded according to their character sets. Use :ref:`messages.getFull` to get the correctly decoded parts. Manually decoding the raw message is probably too error-prone, especially if the message contains MIME parts with different character set encodings or attachments.
  
  To get a readable version of the raw message as it appears in Thunderbird's message source view, it may be sufficient to decode the message according to the character set specified in its main ``content-type`` header (example: `text/html; charset=UTF-8`) using the following function (see MDN for `supported input encodings <https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings>`__): <literalinclude>includes/messages/decodeBinaryString.js<lang>JavaScript</lang></literalinclude>
    */
    function getRaw(messageId: number): Promise<string>;
    /**
     * Lists all of the attachments of a message.
     */
    function listAttachments(messageId: number): Promise<Attachment[]>;
    /**
     * Gets the content of an attachment as a DOM `File` object.
     */
    function getAttachmentFile(
        messageId: number,
        partName: string
    ): Promise</* "unknown" undefined */ object>;
    /**
     * Gets all messages that have the specified properties, or all messages if no properties are specified.
     */
    function query(queryInfo: {
        /**
         * If specified, returns only messages with or without attachments.
         */
        attachment?: boolean;
        /**
         * Returns only messages with this value matching the author. The search value is a single email address, a name or a combination (e.g.: ``Name <user@domain.org>``). The address part of the search value (if provided) must match the author's address completely. The name part of the search value (if provided) must match the author's name partially. All matches are done case-insensitive.
         */
        author?: string;
        /**
         * Returns only messages with this value in the body of the mail.
         */
        body?: string;
        /**
         * Returns only flagged (or unflagged if false) messages.
         */
        flagged?: boolean;
        /**
         * Returns only messages from the specified folder. The <permission>accountsRead</permission> permission is required.
         */
        folder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        /**
         * Returns only messages with a date after this value.
         */
        fromDate?: /* lookup type? "extensionTypes.Date" */ extensionTypes.Date;
        /**
         * Returns only messages with the author's address matching any configured identity.
         */
        fromMe?: boolean;
        /**
         * Returns only messages with this value somewhere in the mail (subject, body or author).
         */
        fullText?: string;
        /**
         * Returns only messages with a Message-ID header matching this value.
         */
        headerMessageId?: string;
        /**
         * Search the folder specified by ``queryInfo.folder`` recursively.
         */
        includeSubFolders?: boolean;
        /**
         * Returns only messages whose recipients match all specified addresses. The search value is a semicolon separated list of email addresses, names or combinations (e.g.: ``Name <user@domain.org>``). For a match, all specified addresses must equal a recipient's address completely and all specified names must match a recipient's name partially. All matches are done case-insensitive.
         */
        recipients?: string;
        /**
         * Returns only messages with this value matching the subject.
         */
        subject?: string;
        /**
         * Returns only messages with the specified tags. For a list of available tags, call the :ref:`messages.listTags` method.
         */
        tags?: TagsDetail;
        /**
         * Returns only messages with a date before this value.
         */
        toDate?: /* lookup type? "extensionTypes.Date" */ extensionTypes.Date;
        /**
         * Returns only messages with at least one recipient address matching any configured identity.
         */
        toMe?: boolean;
        /**
         * Returns only unread (or read if false) messages.
         */
        unread?: boolean;
    }): Promise<MessageList>;
    /**
     * Marks or unmarks a message as junk, read, flagged, or tagged.
     */
    function update(
        messageId: number,
        newProperties: MessageChangeProperties
    ): Promise<any>;
    /**
     * Moves messages to a specified folder.
     */
    function move(
        /**
         * The IDs of the messages to move.
         */ messageIds: number[],
        /**
         * The folder to move the messages to.
         */ destination: /* lookup type? "folders.MailFolder" */ folders.MailFolder
    ): Promise<any>;
    /**
     * Copies messages to a specified folder.
     */
    function copy(
        /**
         * The IDs of the messages to copy.
         */ messageIds: number[],
        /**
         * The folder to copy the messages to.
         */ destination: /* lookup type? "folders.MailFolder" */ folders.MailFolder
    ): Promise<any>;
    /**
     * Archives messages using the current settings.
     */
    function archive(
        /**
         * The IDs of the messages to archive.
         */ messageIds: number[]
    ): Promise<any>;
    /**
     * Returns a list of tags that can be set on messages, and their human-friendly name, colour, and sort order.
     */
    function listTags(): Promise<MessageTag[]>;
    const /* 1 of 5 */ onUpdated: EventHandler</**
         * Fired when one or more properties of a message have been updated.
         */
        (
            message: /* lookup type? "messages.MessageHeader" */ messages.MessageHeader,
            changedProperties: /* lookup type? "messages.MessageChangeProperties" */ messages.MessageChangeProperties
        ) => void>;
    const /* 2 of 5 */ onMoved: EventHandler</**
         * Fired when messages have been moved.
         */
        (
            originalMessages: /* lookup type? "messages.MessageList" */ messages.MessageList,
            movedMessages: /* lookup type? "messages.MessageList" */ messages.MessageList
        ) => void>;
    const /* 3 of 5 */ onCopied: EventHandler</**
         * Fired when messages have been copied.
         */
        (
            originalMessages: /* lookup type? "messages.MessageList" */ messages.MessageList,
            copiedMessages: /* lookup type? "messages.MessageList" */ messages.MessageList
        ) => void>;
    const /* 4 of 5 */ onDeleted: EventHandler</**
         * Fired when messages have been permanently deleted.
         */
        (
            messages: /* lookup type? "messages.MessageList" */ messages.MessageList
        ) => void>;
    const /* 5 of 5 */ onNewMailReceived: EventHandler</**
         * Fired when a new message is received, and has been through junk classification and message filters.
         */
        (
            folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
            messages: /* lookup type? "messages.MessageList" */ messages.MessageList
        ) => void>;
}

declare namespace browser.folders {
    /**
     * An object describing a mail folder, as returned for example by the :ref:`folders.getParentFolders` or :ref:`folders.getSubFolders` methods, or part of a :ref:`accounts.MailAccount` object, which is returned for example by the :ref:`accounts.list` and :ref:`accounts.get` methods. The ``subFolders`` property is only included if requested.
     */
    interface MailFolder {
        /**
         * The account this folder belongs to.
         */
        accountId: string;
        /**
         * The human-friendly name of this folder.
         */
        name?: string;
        /**
         * Path to this folder in the account. Although paths look predictable, never guess a folder's path, as there are a number of reasons why it may not be what you think it is. Use :ref:`folders.getParentFolders` or :ref:`folders.getSubFolders` to obtain hierarchy information.
         */
        path: string;
        /**
         * Subfolders are only included if requested.
         */
        subFolders?: MailFolder[];
        /**
         * The type of folder, for several common types.
         */
        type?:
            | 'inbox'
            | 'drafts'
            | 'sent'
            | 'trash'
            | 'templates'
            | 'archives'
            | 'junk'
            | 'outbox';
    }

    /**
     * An object containing additional information about a mail folder.
     */
    interface MailFolderInfo {
        /**
         * Whether this folder is a favorite folder.
         */
        favorite?: boolean;
        /**
         * Number of messages in this folder.
         */
        totalMessageCount?: number;
        /**
         * Number of unread messages in this folder.
         */
        unreadMessageCount?: number;
    }

    /**
     * Creates a new subfolder in the specified folder or at the root of the specified account.
     */
    function create(
        parent: /* lookup type? "folders.MailFolder" */
        | folders.MailFolder
            | /* lookup type? "accounts.MailAccount" */ accounts.MailAccount,
        childName: string
    ): Promise</* lookup type? "folders.MailFolder" */ folders.MailFolder>;
    /**
     * Renames a folder.
     */
    function rename(
        folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
        newName: string
    ): Promise</* lookup type? "folders.MailFolder" */ folders.MailFolder>;
    /**
     * Moves the given ``sourceFolder`` into the given ``destination``. Throws if the destination already contains a folder with the name of the source folder.
     */
    function move(
        sourceFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
        destination: /* lookup type? "folders.MailFolder" */
        | folders.MailFolder
            | /* lookup type? "accounts.MailAccount" */ accounts.MailAccount
    ): Promise</* lookup type? "folders.MailFolder" */ folders.MailFolder>;
    /**
     * Copies the given ``sourceFolder`` into the given ``destination``.  Throws if the destination already contains a folder with the name of the source folder.
     */
    function copy(
        sourceFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
        destination: /* lookup type? "folders.MailFolder" */
        | folders.MailFolder
            | /* lookup type? "accounts.MailAccount" */ accounts.MailAccount
    ): Promise</* lookup type? "folders.MailFolder" */ folders.MailFolder>;
    /**
     * Get additional information about a mail folder.
     */
    function getFolderInfo(
        folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
    ): Promise<
        /* lookup type? "folders.MailFolderInfo" */ folders.MailFolderInfo
    >;
    /**
     * Get all parent folders as a flat ordered array. The first array entry is the direct parent.
     */
    function getParentFolders(
        folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
        /**
         * Specifies whether the returned :ref:`folders.MailFolder` object for each parent folder should include its nested subfolders . Defaults to ``false``.
         */ includeSubFolders?: boolean
    ): Promise</* z8array */ folders.MailFolder[]>;
    /**
     * Get the subfolders of the specified folder or account.
     */
    function getSubFolders(
        folderOrAccount: /* lookup type? "folders.MailFolder" */
        | folders.MailFolder
            | /* lookup type? "accounts.MailAccount" */ accounts.MailAccount,
        /**
         * Specifies whether the returned :ref:`folders.MailFolder` object for each direct subfolder should also include all its nested subfolders . Defaults to ``true``.
         */ includeSubFolders?: boolean
    ): Promise</* z8array */ folders.MailFolder[]>;
    const /* 1 of 6 */ onCreated: EventHandler</**
         * Fired when a folder has been created.
         */
        (
            createdFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
        ) => void>;
    const /* 2 of 6 */ onRenamed: EventHandler</**
         * Fired when a folder has been renamed.
         */
        (
            originalFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
            renamedFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
        ) => void>;
    const /* 3 of 6 */ onMoved: EventHandler</**
         * Fired when a folder has been moved.
         */
        (
            originalFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
            movedFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
        ) => void>;
    const /* 4 of 6 */ onCopied: EventHandler</**
         * Fired when a folder has been copied.
         */
        (
            originalFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
            copiedFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
        ) => void>;
    const /* 5 of 6 */ onDeleted: EventHandler</**
         * Fired when a folder has been deleted.
         */
        (
            deletedFolder: /* lookup type? "folders.MailFolder" */ folders.MailFolder
        ) => void>;
    const /* 6 of 6 */ onFolderInfoChanged: EventHandler</**
         * Fired when certain information of a folder have changed. Bursts of message count changes are collapsed to a single event.
         */
        (
            folder: /* lookup type? "folders.MailFolder" */ folders.MailFolder,
            folderInfo: /* lookup type? "folders.MailFolderInfo" */ folders.MailFolderInfo
        ) => void>;
}

/**
 * Use sidebar actions to add a sidebar to Firefox.
 */
declare namespace browser.sidebarAction {
    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a `canvas` element).
     */
    interface ImageDataType {}

    /**
     * Sets the title of the sidebar action. This shows up in the tooltip.
     */
    function setTitle(details: {
        /**
         * The string the sidebar action should display when moused over.
         */
        title: string | void /* could not determine correct type */;
        /**
         * Sets the sidebar title for the tab specified by tabId. Automatically resets when the tab is closed.
         */
        tabId?: number;
        /**
         * Sets the sidebar title for the window specified by windowId.
         */
        windowId?: number;
    }): Promise<any>;
    /**
     * Gets the title of the sidebar action.
     */
    function getTitle(details: {
        /**
         * Specify the tab to get the title from. If no tab nor window is specified, the global title is returned.
         */
        tabId?: number;
        /**
         * Specify the window to get the title from. If no tab nor window is specified, the global title is returned.
         */
        windowId?: number;
    }): Promise<any>;
    /**
     * Sets the icon for the sidebar action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    function setIcon(details: {
        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
         */
        imageData?: ImageDataType | /* "unknown" undefined */ object;
        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
         */
        path?: string | /* "unknown" undefined */ object;
        /**
         * Sets the sidebar icon for the tab specified by tabId. Automatically resets when the tab is closed.
         */
        tabId?: number;
        /**
         * Sets the sidebar icon for the window specified by windowId.
         */
        windowId?: number;
    }): Promise<any>;
    /**
     * Sets the url to the html document to be opened in the sidebar when the user clicks on the sidebar action's icon.
     */
    function setPanel(details: {
        /**
         * Sets the sidebar url for the tab specified by tabId. Automatically resets when the tab is closed.
         */
        tabId?: number;
        /**
         * Sets the sidebar url for the window specified by windowId.
         */
        windowId?: number;
        /**
         * The url to the html file to show in a sidebar.  If set to the empty string (''), no sidebar is shown.
         */
        panel: string | void /* could not determine correct type */;
    }): Promise<any>;
    /**
     * Gets the url to the html document set as the panel for this sidebar action.
     */
    function getPanel(details: {
        /**
         * Specify the tab to get the panel from. If no tab nor window is specified, the global panel is returned.
         */
        tabId?: number;
        /**
         * Specify the window to get the panel from. If no tab nor window is specified, the global panel is returned.
         */
        windowId?: number;
    }): Promise<any>;
    /**
     * Opens the extension sidebar in the active window.
     */
    function open(): Promise<any>;
    /**
     * Closes the extension sidebar in the active window if the sidebar belongs to the extension.
     */
    function close(): Promise<any>;
    /**
     * Toggles the extension sidebar in the active window.
     */
    function toggle(): Promise<any>;
    /**
     * Checks whether the sidebar action is open.
     */
    function isOpen(details: {
        /**
         * Specify the window to get the openness from.
         */
        windowId?: number;
    }): Promise<any>;
}

declare namespace browser.addressBooks {
    /**
     * Indicates the type of a Node, which can be one of `addressBook`, `contact`, or `mailingList`.
     */
    /**
     * Indicates the type of a Node, which can be one of `addressBook`, `contact`, or `mailingList`.
     */
    type NodeType = string;
    /**
     * A node representing an address book.
     */
    interface AddressBookNode {
        /**
         * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the program is restarted.
         */
        id: string;
        /**
         * The `id` of the parent object.
         */
        parentId?: string;
        /**
         * Always set to `addressBook`.
         */
        type: NodeType;
        /**
         * Indicates if the object is read-only.
         */
        readOnly?: boolean;
        /**
         * Indicates if the address book is accessed via remote look-up.
         */
        remote?: boolean;
        name: string;
        /**
         * A list of contacts held by this node's address book or mailing list.
         */
        contacts?: /* z8array */ contacts.ContactNode[];
        /**
         * A list of mailingLists in this node's address book.
         */
        mailingLists?: /* z8array */ mailingLists.MailingListNode[];
    }

    /**
     * Opens the address book user interface.
     */
    function openUI(): Promise<any>;
    /**
     * Closes the address book user interface.
     */
    function closeUI(): Promise<any>;
    /**
     * Gets a list of the user's address books, optionally including all contacts and mailing lists.
     */
    function list(
        /**
         * If set to true, results will include contacts and mailing lists for each address book.
         */ complete?: boolean
    ): Promise<AddressBookNode[]>;
    /**
     * Gets a single address book, optionally including all contacts and mailing lists.
     */
    function get(
        id: string,
        /**
         * If set to true, results will include contacts and mailing lists for this address book.
         */ complete?: boolean
    ): Promise<AddressBookNode>;
    /**
     * Creates a new, empty address book.
     */
    function create(properties: { name: string }): Promise<string>;
    /**
     * Renames an address book.
     */
    function update(
        id: string,
        properties: {
            name: string;
        }
    ): Promise<any>;
    const /* 1 of 3 */ onCreated: EventHandler</**
         * Fired when an address book is created.
         */
        (node: AddressBookNode) => void>;
    const /* 2 of 3 */ onUpdated: EventHandler</**
         * Fired when an address book is renamed.
         */
        (node: AddressBookNode) => void>;
    const /* 3 of 3 */ onDeleted: EventHandler</**
         * Fired when an addressBook is deleted.
         */
        (id: string) => void>;
}

declare namespace browser.addressBooks.provider {
    const /* 1 of 1 */ onSearchRequest: EventHandler</**
   * Registering this listener will create and list a read-only address book in Thunderbird's address book window, similar to LDAP address books. When selecting this address book, users will first see no contacts, but they can search for them, which will fire this event. Contacts returned by the listener callback will be displayed as contact cards in the address book. Several listeners can be registered, to create multiple address books.
  
  The event also fires for each registered listener (for each created read-only address book), when users type something into the mail composer's `To:` field, or into similar fields like the calendar meeting attendees field. Contacts returned by the listener callback will be added to the autocomplete results in the dropdown of that field.
  
  Example: <literalinclude>includes/addressBooks/onSearchRequest.js<lang>JavaScript</lang></literalinclude>
    */
        (
            node: AddressBookNode,
            /**
             * The search text that the user entered. Not available when invoked from the advanced address book search dialog.
             */ searchString?: string,
            /**
             * The boolean query expression corresponding to the search. Note: This parameter may change in future releases of Thunderbird.
             */ query?: string
        ) => void>;
}

declare namespace browser.contacts {
    /**
     * A node representing a contact in an address book.
     */
    interface ContactNode {
        /**
         * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the program is restarted.
         */
        id: string;
        /**
         * The `id` of the parent object.
         */
        parentId?: string;
        /**
         * Always set to `contact`.
         */
        type: /* lookup type? "addressBooks.NodeType" */ addressBooks.NodeType;
        /**
         * Indicates if the object is read-only.
         */
        readOnly?: boolean;
        /**
         * Indicates if the object came from a remote address book.
         */
        remote?: boolean;
        properties: ContactProperties;
    }

    /**
   * A set of properties for a particular contact. For a complete list of properties that Thunderbird uses, see https://hg.mozilla.org/comm-central/file/tip/mailnews/addrbook/public/nsIAbCard.idl
  It is also possible to store custom properties. The custom property name however may only use a to z, A to Z, 1 to 9 and underscores.
    */
    interface ContactProperties {}

    /**
     * A dictionary of changed properties. Keys are the property name that changed, values are an object containing ``oldValue`` and ``newValue``. Values can be either a string or null.
     */
    interface PropertyChange {}

    /**
     * Gets all the contacts in the address book with the id `parentId`.
     */
    function list(parentId: string): Promise<ContactNode[]>;
    /**
     * Gets all contacts matching ``queryInfo`` in the address book with the id ``parentId``.
     */
    function quickSearch(
        /**
         * The id of the address book to search. If not specified, all address books are searched.
         */ parentId: string,
        queryInfo:
            | string
            | {
                  /**
                   * One or more space-separated terms to search for.
                   */
                  searchString?: string;
                  /**
                   * Whether to include results from local address books. Defaults to true.
                   */
                  includeLocal?: boolean;
                  /**
                   * Whether to include results from remote address books. Defaults to true.
                   */
                  includeRemote?: boolean;
                  /**
                   * Whether to include results from read-only address books. Defaults to true.
                   */
                  includeReadOnly?: boolean;
                  /**
                   * Whether to include results from read-write address books. Defaults to true.
                   */
                  includeReadWrite?: boolean;
              }
    ): Promise<ContactNode[]>;
    function quickSearch(
        queryInfo:
            | string
            | {
                  /**
                   * One or more space-separated terms to search for.
                   */
                  searchString?: string;
                  /**
                   * Whether to include results from local address books. Defaults to true.
                   */
                  includeLocal?: boolean;
                  /**
                   * Whether to include results from remote address books. Defaults to true.
                   */
                  includeRemote?: boolean;
                  /**
                   * Whether to include results from read-only address books. Defaults to true.
                   */
                  includeReadOnly?: boolean;
                  /**
                   * Whether to include results from read-write address books. Defaults to true.
                   */
                  includeReadWrite?: boolean;
              }
    ): Promise<ContactNode[]>;
    /**
     * Gets a single contact.
     */
    function get(id: string): Promise<ContactNode>;
    /**
     * Adds a new contact to the address book with the id `parentId`.
     */
    function create(
        parentId: string,
        /**
         * Assigns the contact an id. If an existing contact has this id, an exception is thrown.
         */ id: string,
        properties: ContactProperties
    ): Promise<string>;
    function create(
        parentId: string,
        properties: ContactProperties
    ): Promise<string>;
    /**
     * Edits the properties of a contact. To remove a property, specify it as `null`.
     */
    function update(id: string, properties: ContactProperties): Promise<any>;
    const /* 1 of 3 */ onCreated: EventHandler</**
         * Fired when a contact is created.
         */
        (node: ContactNode, id: string) => void>;
    const /* 2 of 3 */ onUpdated: EventHandler</**
         * Fired when a contact is changed.
         */
        (node: ContactNode, changedProperties: PropertyChange) => void>;
    const /* 3 of 3 */ onDeleted: EventHandler</**
         * Fired when a contact is removed from an address book.
         */
        (parentId: string, id: string) => void>;
}

declare namespace browser.mailingLists {
    /**
     * A node representing a mailing list.
     */
    interface MailingListNode {
        /**
         * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the program is restarted.
         */
        id: string;
        /**
         * The `id` of the parent object.
         */
        parentId?: string;
        /**
         * Always set to `mailingList`.
         */
        type: /* lookup type? "addressBooks.NodeType" */ addressBooks.NodeType;
        /**
         * Indicates if the object is read-only.
         */
        readOnly?: boolean;
        /**
         * Indicates if the object came from a remote address book.
         */
        remote?: boolean;
        name: string;
        nickName: string;
        description: string;
        /**
         * A list of contacts held by this node's address book or mailing list.
         */
        contacts?: /* z8array */ contacts.ContactNode[];
    }

    /**
     * Gets all the mailing lists in the address book with id `parentId`.
     */
    function list(parentId: string): Promise<MailingListNode[]>;
    /**
     * Gets a single mailing list.
     */
    function get(id: string): Promise<MailingListNode>;
    /**
     * Creates a new mailing list in the address book with id `parentId`.
     */
    function create(
        parentId: string,
        properties: {
            name: string;
            nickName?: string;
            description?: string;
        }
    ): Promise<string>;
    /**
     * Edits the properties of a mailing list.
     */
    function update(
        id: string,
        properties: {
            name: string;
            nickName?: string;
            description?: string;
        }
    ): Promise<any>;
    /**
     * Adds a contact to the mailing list with id `id`. If the contact and mailing list are in different address books, the contact will also be copied to the list's address book.
     */
    function addMember(id: string, contactId: string): Promise<any>;
    /**
     * Gets all contacts that are members of the mailing list with id `id`.
     */
    function listMembers(
        id: string
    ): Promise</* z8array */ contacts.ContactNode[]>;
    /**
     * Removes a contact from the mailing list with id `id`. This does not delete the contact from the address book.
     */
    function removeMember(id: string, contactId: string): Promise<any>;
    const /* 1 of 5 */ onCreated: EventHandler</**
         * Fired when a mailing list is created.
         */
        (node: MailingListNode) => void>;
    const /* 2 of 5 */ onUpdated: EventHandler</**
         * Fired when a mailing list is changed.
         */
        (node: MailingListNode) => void>;
    const /* 3 of 5 */ onDeleted: EventHandler</**
         * Fired when a mailing list is deleted.
         */
        (parentId: string, id: string) => void>;
    const /* 4 of 5 */ onMemberAdded: EventHandler</**
         * Fired when a contact is added to the mailing list.
         */
        (
            node: /* lookup type? "contacts.ContactNode" */ contacts.ContactNode
        ) => void>;
    const /* 5 of 5 */ onMemberRemoved: EventHandler</**
         * Fired when a contact is removed from the mailing list.
         */
        (parentId: string, id: string) => void>;
}

/**
 * Use the `browser.find` API to interact with the browser's `Find` interface.
 */
declare namespace browser.find {
    /**
     * Search for text in document and store found ranges in array, in document order.
     */
    function find(
        /**
         * The string to search for.
         */ queryphrase: string,
        /**
         * Search parameters.
         */ params?: {
            /**
             * Tab to query. Defaults to the active tab.
             */
            tabId?: number;
            /**
             * Find only ranges with case sensitive match.
             */
            caseSensitive?: boolean;
            /**
             * Find only ranges that match entire word.
             */
            entireWord?: boolean;
            /**
             * Return rectangle data which describes visual position of search results.
             */
            includeRectData?: boolean;
            /**
             * Return range data which provides range data in a serializable form.
             */
            includeRangeData?: boolean;
        }
    ): Promise<any>;
    /**
     * Highlight a range
     */
    function highlightResults(
        /**
         * highlightResults parameters
         */ params?: {
            /**
             * Found range to be highlighted. Default highlights all ranges.
             */
            rangeIndex?: number;
            /**
             * Tab to highlight. Defaults to the active tab.
             */
            tabId?: number;
            /**
             * Don't scroll to highlighted item.
             */
            noScroll?: boolean;
        }
    ): Promise<any>;
    /**
     * Remove all highlighting from previous searches.
     */
    function removeHighlighting(
        /**
         * Tab to highlight. Defaults to the active tab.
         */ tabId?: number
    ): Promise<any>;
}

/**
 * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the xtension.
 */
declare namespace browser.commands {
    interface Command {
        /**
         * The name of the Extension Command
         */
        name?: string;
        /**
         * The Extension Command description
         */
        description?: string;
        /**
         * The shortcut active for this command, or blank if not active.
         */
        shortcut?: string;
    }

    /**
     * Update the details of an already defined command.
     */
    function update(
        /**
         * The new description for the command.
         */ detail: {
            /**
             * The name of the command.
             */
            name: string;
            /**
             * The new description for the command.
             */
            description?: string;
            shortcut?: string;
        }
    ): Promise<any>;
    /**
     * Reset a command's details to what is specified in the manifest.
     */
    function reset(
        /**
         * The name of the command.
         */ name: string
    ): Promise<any>;
    /**
     * Returns all the registered extension commands for this extension and their shortcut (if active).
     */
    function getAll(): Promise<Command[]>;
    const /* 1 of 1 */ onCommand: EventHandler</**
         * Fired when a registered command is activated using a keyboard shortcut.
         */
        (command: string) => void>;
}

declare namespace browser.compose {
    /* skipped: ComposeRecipient: undefined */
    type ComposeRecipient =
        | string
        | {
              /**
               * The ID of a contact or mailing list from the :doc:`contacts` and :doc:`mailingLists` APIs.
               */
              id: string;
              /**
               * Which sort of object this ID is for.
               */
              type: 'contact' | 'mailingList';
          };
    /* skipped: ComposeRecipientList: undefined */
    type ComposeRecipientList = ComposeRecipient | ComposeRecipient[];
    /**
     * Represent the state of the message composer.
     */
    interface ComposeState {
        /**
         * The message can be send now.
         */
        canSendNow: boolean;
        /**
         * The message can be send later.
         */
        canSendLater: boolean;
    }

    /**
     * Used by various functions to represent the state of a message being composed. Note that functions using this type may have a partial implementation.
     */
    interface ComposeDetails {
        /**
         * The ID of an identity from the :doc:`accounts` API. The settings from the identity will be used in the composed message. If ``replyTo`` is also specified, the ``replyTo`` property of the identity is overridden. The permission <permission>accountsRead</permission> is required to include the ``identityId``.
         */
        identityId?: string;
        /**
         * *Caution*: Setting a value for `from` does not change the used identity, it overrides the FROM header. Many email servers do not accept emails where the FROM header does not match the sender identity. Must be set to exactly one valid email address.
         */
        from?: ComposeRecipient;
        to?: ComposeRecipientList;
        cc?: ComposeRecipientList;
        bcc?: ComposeRecipientList;
        replyTo?: ComposeRecipientList;
        followupTo?: ComposeRecipientList;
        newsgroups?: string | string[];
        /**
         * The id of the original message (in case of draft, template, forward or reply). Read-only. Is `null` in all other cases or if the original message was opened from file.
         */
        relatedMessageId?: number;
        subject?: string;
        /**
         * Read-only. The type of the message being composed, depending on how the compose window was opened by the user.
         */
        type?: 'draft' | 'new' | 'redirect' | 'reply' | 'forward';
        body?: string;
        plainTextBody?: string;
        isPlainText?: boolean;
        /**
         * Attachments to add to the message. Only used in the begin* functions.
         */
        attachments?: {
            /**
             * The name, as displayed to the user, of this attachment. If not specified, the name of the ``file`` object is used.
             */
            name?: string;
            file: /* "unknown" undefined */ object;
        }[];
    }

    /**
     * Represents an attachment in a message being composed.
     */
    interface ComposeAttachment {
        /**
         * A unique identifier for this attachment.
         */
        id: number;
        /**
         * The name, as displayed to the user, of this attachment. This is usually but not always the filename of the attached file.
         */
        name: string;
        /**
         * The size in bytes of this attachment.
         */
        size: number;

        /**
         * Retrieves the contents of the attachment as a DOM ``File`` object.
         */

        getFile(): Promise<any>;
    }

    /**
     * Open a new message compose window. If the provided ComposeDetails object does not provide ``body``, ``plainTextBody`` or ``isPlainText``, the default compose format of the used/default identity is used. The :ref:`accounts_api` API can be used to get the used/default identity and its default compose format.
     */
    function beginNew(
        /**
         * If specified, the message or template to edit as a new message.
         */ messageId?: number,
        details?: ComposeDetails
    ): Promise</* lookup type? "tabs.Tab" */ tabs.Tab>;
    /**
     * Open a new message compose window replying to a given message. If the provided ComposeDetails object does not provide ``body``, ``plainTextBody`` or ``isPlainText``, the default compose format of the used/default identity is used. The :ref:`accounts_api` API can be used to get the used/default identity and its default compose format.
     */
    function beginReply(
        /**
         * The message to reply to, as retrieved using other APIs.
         */ messageId: number,
        replyType?: 'replyToSender' | 'replyToList' | 'replyToAll',
        details?: ComposeDetails
    ): Promise</* lookup type? "tabs.Tab" */ tabs.Tab>;
    /**
     * Open a new message compose window forwarding a given message. If the provided ComposeDetails object does not provide ``body``, ``plainTextBody`` or ``isPlainText``, the default compose format of the used/default identity is used. The :ref:`accounts_api` API can be used to get the used/default identity and its default compose format.
     */
    function beginForward(
        /**
         * The message to forward, as retrieved using other APIs.
         */ messageId: number,
        forwardType?: 'forwardInline' | 'forwardAsAttachment',
        details?: ComposeDetails
    ): Promise</* lookup type? "tabs.Tab" */ tabs.Tab>;
    /**
     * Fetches the current state of a compose window. Currently only a limited amount of information is available, more will be added in later versions.
     */
    function getComposeDetails(tabId: number): Promise<ComposeDetails>;
    /**
     * Updates the compose window. Specify only fields that you want to change. Currently only the to/cc/bcc/replyTo/followupTo/newsgroups fields and the subject are implemented. It is not possible to change the compose format.
     */
    function setComposeDetails(
        tabId: number,
        /**
         * The compose format of an already opened compose window cannot be changed. Setting ``details.body``, ``details.plainTextBody`` or ``details.isPlaintext`` will fail if the compose format of the compose window does not match. Use :ref:`compose.getComposeDetails` to get the current compose format.
         */ details: ComposeDetails
    ): Promise<any>;
    /**
     * Lists all of the attachments of the message being composed in the specified tab.
     */
    function listAttachments(tabId: number): Promise<ComposeAttachment[] | any>;
    /**
     * Adds an attachment to the message being composed in the specified tab.
     */
    function addAttachment(
        tabId: number,
        data: {
            /**
             * The name, as displayed to the user, of this attachment. If not specified, the name of the ``file`` object is used.
             */
            name?: string;
            file: /* "unknown" undefined */ object;
        }
    ): Promise<ComposeAttachment | any>;
    /**
     * Renames and/or replaces the contents of an attachment to the message being composed in the specified tab.
     */
    function updateAttachment(
        tabId: number,
        attachmentId: number,
        data: {
            /**
             * The name, as displayed to the user, of this attachment. If not specified, the name of the ``file`` object is used.
             */
            name?: string;
            file?: /* "unknown" undefined */ object;
        }
    ): Promise<ComposeAttachment | any>;
    /**
     * Removes an attachment from the message being composed in the specified tab.
     */
    function removeAttachment(
        tabId: number,
        attachmentId: number
    ): Promise<any>;
    /**
     * Sends the message currently being composed.
     */
    function sendMessage(
        tabId: number,
        options?: {
            mode: 'default' | 'sendNow' | 'sendLater';
        }
    ): Promise<boolean>;
    /**
     * Returns information about the current state of the message composer.
     */
    function getComposeState(tabId: number): Promise<ComposeState>;
    const /* 1 of 5 */ onBeforeSend: EventHandler</**
         * Fired when a message is about to be sent from the compose window. This is a user input event handler. For asynchronous listeners some `restrictions <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/User_actions>`__ apply.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            /**
             * The current state of the compose window. This is functionally the same as the :ref:`compose.getComposeDetails` function.
             */ details: ComposeDetails
        ) => object>;
    const /* 2 of 5 */ onAttachmentAdded: EventHandler</**
         * Fired when an attachment is added to a message being composed.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            attachment: ComposeAttachment
        ) => void>;
    const /* 3 of 5 */ onAttachmentRemoved: EventHandler</**
         * Fired when an attachment is removed from a message being composed.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            attachmentId: number
        ) => void>;
    const /* 4 of 5 */ onIdentityChanged: EventHandler</**
         * Fired when the user changes the identity that will be used to send a message being composed.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            identityId: string
        ) => void>;
    const /* 5 of 5 */ onComposeStateChanged: EventHandler</**
         * Fired when the state of the message composer changed.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            state: ComposeState
        ) => void>;
}

/**
 * Use the `browser.windows` API to interact with Thunderbird. You can use this API to create, modify, and rearrange windows.
 */
declare namespace browser.windows {
    /**
     * The type of a window. Under some circumstances a Window may not be assigned a type property.
     */
    /**
     * The type of a window. Under some circumstances a Window may not be assigned a type property.
     */
    type WindowType = string;
    /**
     * The state of this window.
     */
    /**
     * The state of this window.
     */
    type WindowState = string;
    interface Window {
        /**
         * The ID of the window. Window IDs are unique within a session.
         */
        id?: number;
        /**
         * Whether the window is currently the focused window.
         */
        focused: boolean;
        /**
         * The offset of the window from the top edge of the screen in pixels.
         */
        top?: number;
        /**
         * The offset of the window from the left edge of the screen in pixels.
         */
        left?: number;
        /**
         * The width of the window, including the frame, in pixels.
         */
        width?: number;
        /**
         * The height of the window, including the frame, in pixels.
         */
        height?: number;
        /**
         * Array of :ref:`tabs.Tab` objects representing the current tabs in the window. Only included if requested by :ref:`windows.get`, :ref:`windows.getCurrent`, :ref:`windows.getAll` or :ref:`windows.getLastFocused` and the optional :ref:`windows.GetInfo` parameter has ``populate`` set to ``true``.
         */
        tabs?: /* z8array */ tabs.Tab[];
        /**
         * Whether the window is incognito.
         */
        incognito: boolean;
        /**
         * The type of browser window this is.
         */
        type?: WindowType;
        /**
         * The state of this browser window.
         */
        state?: WindowState;
        /**
         * Whether the window is set to be always on top.
         */
        alwaysOnTop: boolean;
        /**
         * The title of the window. Read-only.
         */
        title?: string;
    }

    /**
     * Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set.
     */
    /**
     * Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set.
     */
    type CreateType = string;
    /**
     * Specifies additional requirements for the returned windows.
     */
    interface GetInfo {
        /**
         * If true, the :ref:`windows.Window` returned will have a <var>tabs</var> property that contains an array of :ref:`tabs.Tab` objects representing the tabs inside the window. The :ref:`tabs.Tab` objects only contain the `url`, `title` and `favIconUrl` properties if the extension's manifest file includes the <permission>tabs</permission> permission.
         */
        populate?: boolean;
        /**
         * If set, the :ref:`windows.Window` returned will be filtered based on its type. Supported by :ref:`windows.getAll` only, ignored in all other functions.
         */
        windowTypes?: WindowType[];
    }

    /**
     * Gets details about a window.
     */
    function get(windowId: number, getInfo?: GetInfo): Promise<Window>;
    /**
     * Gets the current window.
     */
    function getCurrent(getInfo?: GetInfo): Promise<Window>;
    /**
     * Gets the window that was most recently focused &mdash; typically the window 'on top'.
     */
    function getLastFocused(getInfo?: GetInfo): Promise<Window>;
    /**
     * Gets all windows.
     */
    function getAll(getInfo?: GetInfo): Promise<Window[]>;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     */
    function create(createData?: {
        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[];
        /**
         * The id of the tab for which you want to adopt to the new window.
         */
        tabId?: number;
        /**
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number;
        /**
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number;
        /**
         * The width in pixels of the new window, including the frame. If not specified defaults to a natural width.
         */
        width?: number;
        /**
         * The height in pixels of the new window, including the frame. If not specified defaults to a natural height.
         */
        height?: number;
        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean;
        /**
         * Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set.
         */
        type?: CreateType;
        /**
         * The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
         */
        state?: WindowState;
        /**
         * Allow scripts to close the window.
         */
        allowScriptsToClose?: boolean;
        /**
         * A string to add to the beginning of the window title.
         */
        titlePreface?: string;
    }): Promise<Window>;
    /**
     * Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged.
     */
    function update(
        windowId: number,
        updateInfo: {
            /**
             * The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels.
             */
            left?: number;
            /**
             * The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels.
             */
            top?: number;
            /**
             * The width to resize the window to in pixels. This value is ignored for panels.
             */
            width?: number;
            /**
             * The height to resize the window to in pixels. This value is ignored for panels.
             */
            height?: number;
            /**
             * If true, brings the window to the front. If false, brings the next window in the z-order to the front.
             */
            focused?: boolean;
            /**
             * If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request.
             */
            drawAttention?: boolean;
            /**
             * The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
             */
            state?: WindowState;
            /**
             * A string to add to the beginning of the window title.
             */
            titlePreface?: string;
        }
    ): Promise<Window>;
    /**
     * Removes (closes) a window, and all the tabs inside it.
     */
    function remove(windowId: number): Promise<void>;
    /**
     * Opens the provided URL in the default system browser.
     */
    function openDefaultBrowser(url: string): Promise<any>;
    const /* 1 of 3 */ onCreated: EventHandler</**
         * Fired when a window is created.
         */
        (
            /**
             * Details of the window that was created.
             */

            window: Window
        ) => void>;
    const /* 2 of 3 */ onRemoved: EventHandler</**
         * Fired when a window is removed (closed).
         */
        (
            /**
             * ID of the removed window.
             */

            windowId: number
        ) => void>;
    const /* 3 of 3 */ onFocusChanged: EventHandler</**
         * Fired when the currently focused window changes. Will be :ref:`windows.WINDOW_ID_NONE`) if all browser windows have lost focus. Note: On some Linux window managers, WINDOW_ID_NONE will always be sent immediately preceding a switch from one browser window to another.
         */
        (
            /**
             * ID of the newly focused window.
             */

            windowId: number
        ) => void>;
    /**
     * The windowId value that represents the absence of a window.
     */
    const WINDOW_ID_NONE = -1;
    /**
     * The windowId value that represents the current window.
     */
    const WINDOW_ID_CURRENT = -2;
}

/**
 * PKCS#11 module management API
 */
declare namespace browser.pkcs11 {
    /**
     * checks whether a PKCS#11 module, given by name, is installed
     */
    function isModuleInstalled(name: string): Promise<any>;
    /**
     * Install a PKCS#11 module with a given name
     */
    function installModule(name: string, flags?: number): Promise<any>;
    /**
     * Remove an installed PKCS#11 module from firefox
     */
    function uninstallModule(name: string): Promise<any>;
    /**
     * Enumerate a module's slots, each with their name and whether a token is present
     */
    function getModuleSlots(name: string): Promise<any>;
}

/**
 * Use the `browser.tabs` API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
 */
declare namespace browser.tabs {
    interface Tab {
        /**
         * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID. Tab ID can also be set to :ref:`tabs.TAB_ID_NONE` for apps and devtools windows.
         */
        id?: number;
        /**
         * The zero-based index of the tab within its window.
         */
        index: number;
        /**
         * The ID of the window the tab is contained within.
         */
        windowId?: number;
        /**
         * Whether the tab is highlighted. Works as an alias of active
         */
        highlighted: boolean;
        /**
         * Whether the tab is active in its window. (Does not necessarily mean the window is focused.)
         */
        active: boolean;
        /**
         * The URL the tab is displaying. This property is only present if the extension's manifest includes the <permission>tabs</permission> permission.
         */
        url?: string;
        /**
         * The title of the tab. This property is only present if the extension's manifest includes the <permission>tabs</permission> permission.
         */
        title?: string;
        /**
         * The URL of the tab's favicon. This property is only present if the extension's manifest includes the <permission>tabs</permission> permission. It may also be an empty string if the tab is loading.
         */
        favIconUrl?: string;
        /**
         * Either *loading* or *complete*.
         */
        status?: string;
        /**
         * The width of the tab in pixels.
         */
        width?: number;
        /**
         * The height of the tab in pixels.
         */
        height?: number;
        type?:
            | 'addressBook'
            | 'calendar'
            | 'calendarEvent'
            | 'calendarTask'
            | 'chat'
            | 'content'
            | 'mail'
            | 'messageCompose'
            | 'messageDisplay'
            | 'special'
            | 'tasks';
        /**
         * Whether the tab is a 3-pane tab.
         */
        mailTab?: boolean;
    }

    /**
     * Whether the tabs have completed loading.
     */
    /**
     * Whether the tabs have completed loading.
     */
    type TabStatus = string;
    /**
     * The type of a window. Under some circumstances a Window may not be assigned a type property.
     */
    /**
     * The type of a window. Under some circumstances a Window may not be assigned a type property.
     */
    type WindowType = string;
    /**
     * Event names supported in onUpdated.
     */
    /**
     * Event names supported in onUpdated.
     */
    type UpdatePropertyName = string;
    /**
     * An object describing filters to apply to tabs.onUpdated events.
     */
    interface UpdateFilter {
        /**
         * A list of URLs or URL patterns. Events that cannot match any of the URLs will be filtered out.  Filtering with urls requires the <permission>tabs</permission> or  <permission>activeTab</permission> permission.
         */
        urls?: string[];
        /**
         * A list of property names. Events that do not match any of the names will be filtered out.
         */
        properties?: UpdatePropertyName[];
        tabId?: number;
        windowId?: number;
    }

    /**
     * Retrieves details about the specified tab.
     */
    function get(tabId: number): Promise<Tab>;
    /**
     * Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view).
     */
    function getCurrent(): Promise<Tab>;
    /**
     * Connects to the content script(s) in the specified tab. The `runtime.onConnect <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onConnect>`_ event is fired in each content script running in the specified tab for the current extension. For more details, see `Content Script Messaging <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts>`_.
     */
    function connect(
        tabId: number,
        connectInfo?: {
            /**
             * Will be passed into onConnect for content scripts that are listening for the connection event.
             */
            name?: string;
            /**
             * Open a port to a specific frame identified by `frameId` instead of all frames in the tab.
             */
            frameId?: number;
        }
    ): undefined;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The `runtime.onMessage <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage>`_ event is fired in each content script running in the specified tab for the current extension.
     */
    function sendMessage(
        tabId: number,
        message: any,
        options?: {
            /**
             * Send a message to a specific frame identified by `frameId` instead of all frames in the tab.
             */
            frameId?: number;
        }
    ): Promise<any>;
    /**
     * Creates a new tab or switches to a tab with the given URL, if it exists already.
     */
    function create(createProperties: {
        /**
         * The window to create the new tab in. Defaults to the current window.
         */
        windowId?: number;
        /**
         * The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window.
         */
        index?: number;
        /**
         * The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string;
        /**
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see :ref:`windows.update`). Defaults to <var>true</var>.
         */
        active?: boolean;
    }): Promise<Tab>;
    /**
     * Duplicates a tab.
     */
    function duplicate(
        /**
         * The ID of the tab which is to be duplicated.
         */ tabId: number
    ): Promise<Tab>;
    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     */
    function query(queryInfo: {
        /**
         * Whether the tab is a Thunderbird 3-pane tab.
         */
        mailTab?: boolean;
        /**
         * Match tabs against the given Tab.type (see :ref:`tabs.Tab`). Ignored if ``queryInfo.mailTab`` is specified.
         */
        type?: string;
        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean;
        /**
         * Whether the tabs are highlighted.  Works as an alias of active.
         */
        highlighted?: boolean;
        /**
         * Whether the tabs are in the current window.
         */
        currentWindow?: boolean;
        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean;
        /**
         * Whether the tabs have completed loading.
         */
        status?: TabStatus;
        /**
         * Match page titles against a pattern.
         */
        title?: string;
        /**
         * Match tabs against one or more `URL Patterns <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns>`_. Note that fragment identifiers are not matched.
         */
        url?: string | string[];
        /**
         * The ID of the parent window, or :ref:`windows.WINDOW_ID_CURRENT` for the current window.
         */
        windowId?: number;
        /**
         * The type of window the tabs are in.
         */
        windowType?: WindowType;
        /**
         * The position of the tabs within their windows.
         */
        index?: number;
    }): Promise<Tab[]>;
    /**
     * Modifies the properties of a tab. Properties that are not specified in <var>updateProperties</var> are not modified.
     */
    function update(
        /**
         * Defaults to the selected tab of the current window.
         */ tabId: number,
        updateProperties: {
            /**
             * A URL to navigate the tab to.
             */
            url?: string;
            /**
             * Whether the tab should be active. Does not affect whether the window is focused (see :ref:`windows.update`).
             */
            active?: boolean;
        }
    ): Promise<Tab>;
    function update(updateProperties: {
        /**
         * A URL to navigate the tab to.
         */
        url?: string;
        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see :ref:`windows.update`).
         */
        active?: boolean;
    }): Promise<Tab>;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal windows (`window.type === "normal"`).
     */
    function move(
        /**
         * The tab or list of tabs to move.
         */ tabIds: number | number[],
        moveProperties: {
            /**
             * Defaults to the window the tab is currently in.
             */
            windowId?: number;
            /**
             * The position to move the window to. -1 will place the tab at the end of the window.
             */
            index: number;
        }
    ): Promise<Tab | Tab[]>;
    /**
     * Reload a tab.
     */
    function reload(
        /**
         * The ID of the tab to reload; defaults to the selected tab of the current window.
         */ tabId?: number,
        reloadProperties?: {
            /**
             * Whether using any local cache. Default is false.
             */
            bypassCache?: boolean;
        }
    ): Promise<void>;
    /**
     * Closes one or more tabs.
     */
    function remove(
        /**
         * The tab or list of tabs to close.
         */ tabIds: number | number[]
    ): Promise<void>;
    /**
     * Injects JavaScript code into a page. For details, see the `programmatic injection <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts>`_ section of the content scripts doc.
     */
    function executeScript(
        /**
         * The ID of the tab in which to run the script; defaults to the active tab of the current window.
         */ tabId: number,
        /**
         * Details of the script to run.
         */ details: /* lookup type? "extensionTypes.InjectDetails" */ extensionTypes.InjectDetails
    ): Promise<any[]>;
    function executeScript(
        /**
         * Details of the script to run.
         */ details: /* lookup type? "extensionTypes.InjectDetails" */ extensionTypes.InjectDetails
    ): Promise<any[]>;
    /**
     * Injects CSS into a page. For details, see the `programmatic injection <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts>`_ section of the content scripts doc.
     */
    function insertCSS(
        /**
         * The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
         */ tabId: number,
        /**
         * Details of the CSS text to insert.
         */ details: /* lookup type? "extensionTypes.InjectDetails" */ extensionTypes.InjectDetails
    ): Promise<void>;
    function insertCSS(
        /**
         * Details of the CSS text to insert.
         */ details: /* lookup type? "extensionTypes.InjectDetails" */ extensionTypes.InjectDetails
    ): Promise<void>;
    /**
     * Removes injected CSS from a page. For details, see the `programmatic injection <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts>`_ section of the content scripts doc.
     */
    function removeCSS(
        /**
         * The ID of the tab from which to remove the injected CSS; defaults to the active tab of the current window.
         */ tabId: number,
        /**
         * Details of the CSS text to remove.
         */ details: /* lookup type? "extensionTypes.InjectDetails" */ extensionTypes.InjectDetails
    ): Promise<void>;
    function removeCSS(
        /**
         * Details of the CSS text to remove.
         */ details: /* lookup type? "extensionTypes.InjectDetails" */ extensionTypes.InjectDetails
    ): Promise<void>;
    const /* 1 of 7 */ onCreated: EventHandler</**
         * Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
         */
        (
            /**
             * Details of the tab that was created.
             */

            tab: Tab
        ) => void>;
    const /* 2 of 7 */ onUpdated: EventHandler</**
         * Fired when a tab is updated.
         */
        (
            tabId: number,
            /**
             * Lists the changes to the state of the tab that was updated.
             */ changeInfo: {
                /**
                 * The status of the tab. Can be either *loading* or *complete*.
                 */
                status?: string;
                /**
                 * The tab's URL if it has changed.
                 */
                url?: string;
                /**
                 * The tab's new favicon URL.
                 */
                favIconUrl?: string;
            },
            /**
             * Gives the state of the tab that was updated.
             */ tab: Tab
        ) => void>;
    const /* 3 of 7 */ onMoved: EventHandler</**
         * Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see :ref:`tabs.onDetached`.
         */
        (
            tabId: number,
            moveInfo: {
                windowId: number;
                fromIndex: number;
                toIndex: number;
            }
        ) => void>;
    const /* 4 of 7 */ onActivated: EventHandler</**
         * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
         */
        (activeInfo: {
            /**
             * The ID of the tab that has become active.
             */
            tabId: number;
            /**
             * The ID of the window the active tab changed inside of.
             */
            windowId: number;
        }) => void>;
    const /* 5 of 7 */ onDetached: EventHandler</**
         * Fired when a tab is detached from a window, for example because it is being moved between windows.
         */
        (
            tabId: number,
            detachInfo: {
                oldWindowId: number;
                oldPosition: number;
            }
        ) => void>;
    const /* 6 of 7 */ onAttached: EventHandler</**
         * Fired when a tab is attached to a window, for example because it was moved between windows.
         */
        (
            tabId: number,
            attachInfo: {
                newWindowId: number;
                newPosition: number;
            }
        ) => void>;
    const /* 7 of 7 */ onRemoved: EventHandler</**
         * Fired when a tab is closed.
         */
        (
            tabId: number,
            removeInfo: {
                /**
                 * The window whose tab is closed.
                 */
                windowId: number;
                /**
                 * True when the tab is being closed because its window is being closed.
                 */
                isWindowClosing: boolean;
            }
        ) => void>;
    /**
     * An ID which represents the absence of a browser tab.
     */
    const TAB_ID_NONE = -1;
}

declare namespace browser.menus {
    /**
     * The different contexts a menu can appear in. Specifying `all` is equivalent to the combination of all other contexts excluding `tab` and `tools_menu`. More information about each context can be found in the `Supported UI Elements <https://developer.thunderbird.net/add-ons/mailextensions/supported-ui-elements#menu-items>`__ article on developer.thunderbird.net.
     */
    /**
     * The different contexts a menu can appear in. Specifying `all` is equivalent to the combination of all other contexts excluding `tab` and `tools_menu`. More information about each context can be found in the `Supported UI Elements <https://developer.thunderbird.net/add-ons/mailextensions/supported-ui-elements#menu-items>`__ article on developer.thunderbird.net.
     */
    type ContextType = string;
    /**
     * The type of menu item.
     */
    /**
     * The type of menu item.
     */
    type ItemType = string;
    /**
   * Information sent when a context menu is being shown. For more information about each property, see :ref:`menus.OnClickData`. 
  Some properties are only included if the extension has host permission for the given context, for example :permission:`activeTab` for content tabs, :permission:`compose` for compose tabs and :permission:`messagesRead` for message display tabs.
    */
    interface OnShowData {
        /**
         * A list of IDs of the menu items that were shown.
         */
        menuIds: [];
        /**
         * A list of all contexts that apply to the menu.
         */
        contexts: ContextType[];
        viewType?: /* lookup type? "extension.ViewType" */ extension.ViewType;
        editable: boolean;
        mediaType?: string;
        /**
         * Host permission is required.
         */
        linkUrl?: string;
        /**
         * Host permission is required.
         */
        linkText?: string;
        /**
         * Host permission is required.
         */
        srcUrl?: string;
        /**
         * Host permission is required.
         */
        pageUrl?: string;
        /**
         * Host permission is required.
         */
        frameUrl?: string;
        /**
         * Host permission is required.
         */
        selectionText?: string;
        targetElementId?: number;
        fieldId?: string;
        selectedMessages?: /* lookup type? "messages.MessageList" */ messages.MessageList;
        displayedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        selectedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        selectedAccount?: /* lookup type? "accounts.MailAccount" */ accounts.MailAccount;
        attachments?: /* z8array */ compose.ComposeAttachment[];
    }

    /**
     * Information sent when a context menu item is clicked.
     */
    interface OnClickData {
        /**
         * The ID of the menu item that was clicked.
         */
        menuItemId: number | string;
        /**
         * The parent ID, if any, for the item clicked.
         */
        parentMenuItemId?: number | string;
        /**
         * The type of view where the menu is clicked. May be unset if the menu is not associated with a view.
         */
        viewType?: /* lookup type? "extension.ViewType" */ extension.ViewType;
        /**
         * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
         */
        mediaType?: string;
        /**
         * If the element is a link, the text of that link.
         */
        linkText?: string;
        /**
         * If the element is a link, the URL it points to.
         */
        linkUrl?: string;
        /**
         * Will be present for elements with a 'src' URL.
         */
        srcUrl?: string;
        /**
         * The URL of the page where the menu item was clicked. This property is not set if the click occurred in a context where there is no current page, such as in a launcher context menu.
         */
        pageUrl?: string;
        /**
         * The id of the frame of the element where the context menu was clicked.
         */
        frameId?: number;
        /**
         * The URL of the frame of the element where the context menu was clicked, if it was in a frame.
         */
        frameUrl?: string;
        /**
         * The text for the context selection, if any.
         */
        selectionText?: string;
        /**
         * A flag indicating whether the element is editable (text input, textarea, etc.).
         */
        editable: boolean;
        /**
         * A flag indicating the state of a checkbox or radio item before it was clicked.
         */
        wasChecked?: boolean;
        /**
         * A flag indicating the state of a checkbox or radio item after it is clicked.
         */
        checked?: boolean;
        /**
         * An array of keyboard modifiers that were held while the menu item was clicked.
         */
        modifiers: 'Shift' | 'Alt' | 'Command' | 'Ctrl' | 'MacCtrl'[];
        /**
         * An integer value of button by which menu item was clicked.
         */
        button?: number;
        /**
         * An identifier of the clicked content element, if any. Use menus.getTargetElement in the page to find the corresponding element.
         */
        targetElementId?: number;
        /**
         * An identifier of the clicked Thunderbird UI element, if any.
         */
        fieldId?:
            | 'composeSubject'
            | 'composeTo'
            | 'composeCc'
            | 'composeBcc'
            | 'composeReplyTo'
            | 'composeNewsgroupTo';
        /**
         * The selected messages, if the context menu was opened in the message list. The <permission>messagesRead</permission> permission is required.
         */
        selectedMessages?: /* lookup type? "messages.MessageList" */ messages.MessageList;
        /**
         * The displayed folder, if the context menu was opened in the message list. The <permission>accountsRead</permission> permission is required.
         */
        displayedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        /**
         * The selected folder, if the context menu was opened in the folder pane. The <permission>accountsRead</permission> permission is required.
         */
        selectedFolder?: /* lookup type? "folders.MailFolder" */ folders.MailFolder;
        /**
         * The selected account, if the context menu was opened on an account entry in the folder pane. The <permission>accountsRead</permission> permission is required.
         */
        selectedAccount?: /* lookup type? "accounts.MailAccount" */ accounts.MailAccount;
        /**
         * The selected attachments of a message being composed. The <permission>compose</permission> permission is required.
         */
        attachments?: /* z8array */ compose.ComposeAttachment[];
    }

    /**
     * Creates a new context menu item. Note that if an error occurs during creation, you may not find out until the creation callback fires (the details will be in `runtime.lastError <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/lastError>`_).
     */
    function create(createProperties: {
        /**
         * The type of menu item. Defaults to 'normal' if not specified.
         */
        type?: ItemType;
        /**
         * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
         */
        id?: string;
        icons?: /* "unknown" undefined */ object;
        /**
         * The text to be displayed in the item; this is *required* unless `type` is 'separator'. When the context is 'selection', you can use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin". To specify an access key for the new menu entry, include a `&` before the desired letter in the title. For example "&Help".
         */
        title?: string;
        /**
         * The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.
         */
        checked?: boolean;
        /**
         * List of contexts this menu item will appear in. Defaults to ['page'] if not specified.
         */
        contexts?: ContextType[];
        /**
         * List of view types where the menu item will be shown. Defaults to any view, including those without a viewType.
         */
        viewTypes?: /* z8array */ extension.ViewType[];
        /**
         * Whether the item is visible in the menu.
         */
        visible?: boolean;
        /**
         * A function that will be called back when the menu item is clicked. Event pages cannot use this.
         */
        onclick?: /* or any?  */ (
            /**
             * Information about the item clicked and the context where the click happened.
             */

            info: OnClickData,
            /**
             * The details of the tab where the click took place. Note: this parameter only present for extensions.
             */ tab: /* lookup type? "tabs.Tab" */ tabs.Tab
        ) => void;
        /* x7 */

        /**
         * The ID of a parent menu item; this makes the item a child of a previously added item.
         */
        parentId?: number | string;
        /**
         * Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see `Match Patterns <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns>`_.
         */
        documentUrlPatterns?: string[];
        /**
         * Similar to documentUrlPatterns, but lets you filter based on the src attribute of img/audio/video tags and the href of anchor tags.
         */
        targetUrlPatterns?: string[];
        /**
         * Whether this context menu item is enabled or disabled. Defaults to true.
         */
        enabled?: boolean;
        /**
         * Specifies a command to issue for the context click.  Currently supports internal command _execute_browser_action.
         */
        command?: string;
    }): undefined;
    /**
     * Updates a previously created context menu item.
     */
    function update(
        /**
         * The ID of the item to update.
         */ id: number | string,
        /**
         * The properties to update. Accepts the same values as the create function.
         */ updateProperties: {
            type?: ItemType;
            icons?: /* "unknown" undefined */ object;
            title?: string;
            checked?: boolean;
            contexts?: ContextType[];
            viewTypes?: /* z8array */ extension.ViewType[];
            /**
             * Whether the item is visible in the menu.
             */
            visible?: boolean;
            onclick?: /* or any?  */ (
                info: OnClickData,
                /**
                 * The details of the tab where the click took place. Note: this parameter only present for extensions.
                 */ tab: /* lookup type? "tabs.Tab" */ tabs.Tab
            ) => void;
            /* x7 */

            /**
             * Note: You cannot change an item to be a child of one of its own descendants.
             */
            parentId?: number | string;
            documentUrlPatterns?: string[];
            targetUrlPatterns?: string[];
            enabled?: boolean;
        }
    ): Promise<void>;
    /**
     * Removes a context menu item.
     */
    function remove(
        /**
         * The ID of the context menu item to remove.
         */ menuItemId: number | string
    ): Promise<void>;
    /**
     * Removes all context menu items added by this extension.
     */
    function removeAll(): Promise<void>;
    /**
     * Show the matching menu items from this extension instead of the default menu. This should be called during a 'contextmenu' DOM event handler, and only applies to the menu that opens after this event.
     */
    function overrideContext(contextOptions: {
        /**
         * Whether to also include default menu items in the menu.
         */
        showDefaults?: boolean;
        /**
         * ContextType to override, to allow menu items from other extensions in the menu. Currently only 'tab' is supported. showDefaults cannot be used with this option.
         */
        context?: 'tab';
        /**
         * Required when context is 'tab'. Requires the <permission>tabs</permission> permission.
         */
        tabId?: number;
    }): void;
    /**
     * Updates the extension items in the shown menu, including changes that have been made since the menu was shown. Has no effect if the menu is hidden. Rebuilding a shown menu is an expensive operation, only invoke this method when necessary.
     */
    function refresh(): Promise<any>;
    /**
     * Retrieve the element that was associated with a recent contextmenu event.
     */
    function getTargetElement(
        /**
         * The identifier of the clicked element, available as info.targetElementId in the menus.onShown, onClicked or onclick event.
         */ targetElementId: number
    ): object;
    const /* 1 of 3 */ onClicked: EventHandler</**
         * Fired when a context menu item is clicked. This is a user input event handler. For asynchronous listeners some `restrictions <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/User_actions>`__ apply.
         */
        (
            /**
             * Information about the item clicked and the context where the click happened.
             */

            info: OnClickData,
            /**
             * The details of the tab where the click took place. If the click did not take place in a tab, this parameter will be missing.
             */ tab?: /* lookup type? "tabs.Tab" */ tabs.Tab
        ) => void>;
    const /* 2 of 3 */ onShown: EventHandler</**
         * Fired when a menu is shown. The extension can add, modify or remove menu items and call ``menus.refresh()`` to update the menu.
         */
        (
            /**
             * Information about the context of the menu action and the created menu items.
             */

            info: OnShowData,
            /**
             * The details of the tab where the menu was opened.
             */ tab: /* lookup type? "tabs.Tab" */ tabs.Tab
        ) => void>;
    const /* 3 of 3 */ onHidden: EventHandler</**
         * Fired when a menu is hidden. This event is only fired if onShown has fired before.
         */
        () => void>;
    /**
     * The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.
     */
    const ACTION_MENU_TOP_LEVEL_LIMIT = 6;
}

declare namespace browser.composeScripts {
    /**
     * Details of a compose script registered programmatically
     */
    interface RegisteredComposeScriptOptions {
        /**
         * The list of CSS files to inject
         */
        css?: /* z8array */ extensionTypes.ExtensionFileOrCode[];
        /**
         * The list of JavaScript files to inject
         */
        js?: /* z8array */ extensionTypes.ExtensionFileOrCode[];
    }

    /**
     * An object that represents a compose script registered programmatically
     */
    interface RegisteredComposeScript {
        /**
         * Unregister a compose script registered programmatically
         */

        unregister(): Promise<any>;
    }

    /**
     * Register a compose script programmatically
     */
    function register(
        composeScriptOptions: RegisteredComposeScriptOptions
    ): Promise<any>;
}

declare namespace browser.messageDisplayScripts {
    /**
     * Details of a message display script registered programmatically
     */
    interface RegisteredMessageDisplayScriptOptions {
        /**
         * The list of CSS files to inject
         */
        css?: /* z8array */ extensionTypes.ExtensionFileOrCode[];
        /**
         * The list of JavaScript files to inject
         */
        js?: /* z8array */ extensionTypes.ExtensionFileOrCode[];
    }

    /**
     * An object that represents a message display script registered programmatically
     */
    interface RegisteredMessageDisplayScript {
        /**
         * Unregister a message display script registered programmatically
         */

        unregister(): Promise<any>;
    }

    /**
     * Register a message display script programmatically
     */
    function register(
        messageDisplayScriptOptions: RegisteredMessageDisplayScriptOptions
    ): Promise<any>;
}

declare namespace browser.accounts {
    /**
     * An object describing a mail account, as returned for example by the :ref:`accounts.list` and :ref:`accounts.get` methods. The ``folders`` property is only included if requested.
     */
    interface MailAccount {
        /**
         * A unique identifier for this account.
         */
        id: string;
        /**
         * The human-friendly name of this account.
         */
        name: string;
        /**
         * What sort of account this is, e.g. ``imap``, ``nntp``, or ``pop3``.
         */
        type: string;
        /**
         * The folders for this account are only included if requested.
         */
        folders?: /* z8array */ folders.MailFolder[];
        /**
         * The identities associated with this account. The default identity is listed first, others in no particular order.
         */
        identities: /* z8array */ identities.MailIdentity[];
    }

    /**
     * Returns all mail accounts.
     */
    function list(
        /**
         * Specifies whether the returned :ref:`accounts.MailAccount` objects should included their account's folders. Defaults to ``true``.
         */ includeFolders?: boolean
    ): Promise</* z8array */ accounts.MailAccount[]>;
    /**
     * Returns details of the requested account, or null if it doesn't exist.
     */
    function get(
        accountId: string,
        /**
         * Specifies whether the returned :ref:`accounts.MailAccount` object should included the account's folders. Defaults to ``true``.
         */ includeFolders?: boolean
    ): Promise</* lookup type? "accounts.MailAccount" */ accounts.MailAccount>;
    /**
     * Returns the default account, or null if it is not defined.
     */
    function getDefault(
        /**
         * Specifies whether the returned :ref:`accounts.MailAccount` object should included the account's folders. Defaults to ``true``.
         */ includeFolders?: boolean
    ): Promise</* lookup type? "accounts.MailAccount" */ accounts.MailAccount>;
    /**
     * Sets the default identity for an account.
     */
    function setDefaultIdentity(
        accountId: string,
        identityId: string
    ): Promise<any>;
    /**
     * Returns the default identity for an account, or null if it is not defined.
     */
    function getDefaultIdentity(
        accountId: string
    ): Promise<
        /* lookup type? "identities.MailIdentity" */ identities.MailIdentity
    >;
}

declare namespace browser.cloudFile {
    /**
     * Information about a cloud file account
     */
    interface CloudFileAccount {
        /**
         * Unique identifier of the account
         */
        id: string;
        /**
         * If true, the account is configured and ready to use. Only configured accounts are offered to the user.
         */
        configured: boolean;
        /**
         * A user-friendly name for this account.
         */
        name: string;
        /**
         * The maximum size in bytes for a single file to upload. Set to -1 if unlimited.
         */
        uploadSizeLimit?: number;
        /**
         * The amount of remaining space on the cloud provider, in bytes. Set to -1 if unsupported.
         */
        spaceRemaining?: number;
        /**
         * The amount of space already used on the cloud provider, in bytes. Set to -1 if unsupported.
         */
        spaceUsed?: number;
        /**
         * A page for configuring accounts, to be displayed in the preferences UI.
         */
        managementUrl: string;
    }

    /**
     * Information about a cloud file
     */
    interface CloudFile {
        /**
         * An identifier for this file
         */
        id: number;
        /**
         * Filename of the file to be transferred
         */
        name: string;
        data: /* "unknown" undefined */
            | object
            | /* "unknown" undefined */ object;
    }

    /**
     * Retrieve information about a single cloud file account
     */
    function getAccount(
        /**
         * Unique identifier of the account
         */ accountId: string
    ): Promise<CloudFileAccount>;
    /**
     * Retrieve all cloud file accounts for the current add-on
     */
    function getAllAccounts(): Promise<CloudFileAccount[]>;
    /**
     * Update a cloud file account
     */
    function updateAccount(
        /**
         * Unique identifier of the account
         */ accountId: string,
        updateProperties: {
            /**
             * If true, the account is configured and ready to use. Only configured accounts are offered to the user.
             */
            configured?: boolean;
            /**
             * The maximum size in bytes for a single file to upload. Set to -1 if unlimited.
             */
            uploadSizeLimit?: number;
            /**
             * The amount of remaining space on the cloud provider, in bytes. Set to -1 if unsupported.
             */
            spaceRemaining?: number;
            /**
             * The amount of space already used on the cloud provider, in bytes. Set to -1 if unsupported.
             */
            spaceUsed?: number;
            /**
             * A page for configuring accounts, to be displayed in the preferences UI.
             */
            managementUrl?: string;
        }
    ): Promise<CloudFileAccount>;
    const /* 1 of 5 */ onFileUpload: EventHandler</**
         * Fired when a file should be uploaded to the cloud file provider
         */
        (
            /**
             * The created account
             */

            account: CloudFileAccount,
            /**
             * The file to upload
             */ fileInfo: CloudFile,
            /**
             * The tab where the upload was initiated. Currently only available for the message composer.
             */ tab: /* lookup type? "tabs.Tab" */ tabs.Tab
        ) => object>;
    const /* 2 of 5 */ onFileUploadAbort: EventHandler<(
            /**
             * The created account
             */

            account: CloudFileAccount,
            /**
             * An identifier for this file
             */ fileId: number,
            /**
             * The tab where the upload was initiated. Currently only available for the message composer.
             */ tab: /* lookup type? "tabs.Tab" */ tabs.Tab
        ) => void>;
    const /* 3 of 5 */ onFileDeleted: EventHandler</**
         * Fired when a file previously uploaded should be deleted
         */
        (
            /**
             * The created account
             */

            account: CloudFileAccount,
            /**
             * An identifier for this file
             */ fileId: number,
            /**
             * The tab where the upload was initiated. Currently only available for the message composer.
             */ tab: /* lookup type? "tabs.Tab" */ tabs.Tab
        ) => void>;
    const /* 4 of 5 */ onAccountAdded: EventHandler</**
         * Fired when a cloud file account of this add-on was created
         */
        (
            /**
             * The created account
             */

            account: CloudFileAccount
        ) => void>;
    const /* 5 of 5 */ onAccountDeleted: EventHandler</**
         * Fired when a cloud file account of this add-on was deleted
         */
        (
            /**
             * The id of the removed account
             */

            accountId: string
        ) => void>;
}

declare namespace browser.permissions {
    interface Permissions {
        permissions?: /* z8array */ manifest.OptionalPermission[];
        origins?: /* z8array */ manifest.MatchPattern[];
    }

    interface AnyPermissions {
        permissions?: /* z8array */ manifest.Permission[];
        origins?: /* z8array */ manifest.MatchPattern[];
    }

    /**
     * Get a list of all the extension's permissions.
     */
    function getAll(): Promise<AnyPermissions>;
    /**
     * Check if the extension has the given permissions.
     */
    function contains(permissions: AnyPermissions): Promise<boolean>;
    /**
     * Request the given permissions.
     */
    function request(permissions: Permissions): Promise<boolean>;
    /**
     * Relinquish the given permissions.
     */
    function remove(permissions: Permissions): Promise<void>;
    const /* 1 of 2 */ onAdded: EventHandler</**
         * Fired when the extension acquires new permissions.
         */
        (permissions: Permissions) => void>;
    const /* 2 of 2 */ onRemoved: EventHandler</**
         * Fired when permissions are removed from the extension.
         */
        (permissions: Permissions) => void>;
}

declare namespace browser.privacy {}

/**
 * Use the `browser.privacy` API to control usage of the features in the browser that can affect a user's privacy.
 */
declare namespace browser.privacy.network {
    /**
     * The IP handling policy of WebRTC.
     */
    /**
     * The IP handling policy of WebRTC.
     */
    type IPHandlingPolicy = string;
    /**
     * An object which describes TLS minimum and maximum versions.
     */
    interface tlsVersionRestrictionConfig {
        /**
         * The minimum TLS version supported.
         */
        minimum?: 'TLSv1' | 'TLSv1.1' | 'TLSv1.2' | 'TLSv1.3' | 'unknown';
        /**
         * The maximum TLS version supported.
         */
        maximum?: 'TLSv1' | 'TLSv1.1' | 'TLSv1.2' | 'TLSv1.3' | 'unknown';
    }

    /**
     * If enabled, the browser attempts to speed up your web browsing experience by pre-resolving DNS entries, prerendering sites (`&lt;link rel='prefetch' ...&gt;`), and preemptively opening TCP and SSL connections to servers.  This preference's value is a boolean, defaulting to `true`.
     */
    const networkPredictionEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Allow users to enable and disable RTCPeerConnections (aka WebRTC).
     */
    const peerConnectionEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Allow users to specify the media performance/privacy tradeoffs which impacts how WebRTC traffic will be routed and how much local address information is exposed. This preference's value is of type IPHandlingPolicy, defaulting to `default`.
     */
    const webRTCIPHandlingPolicy: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This property controls the minimum and maximum TLS versions. This setting's value is an object of $(ref:tlsVersionRestrictionConfig).
     */
    const tlsVersionRestriction: /* lookup type? "types.Setting" */ types.Setting;
}

/**
 * Use the `browser.privacy` API to control usage of the features in the browser that can affect a user's privacy.
 */
declare namespace browser.privacy.services {
    /**
     * If enabled, the password manager will ask if you want to save passwords. This preference's value is a boolean, defaulting to `true`.
     */
    const passwordSavingEnabled: /* lookup type? "types.Setting" */ types.Setting;
}

/**
 * Use the `browser.privacy` API to control usage of the features in the browser that can affect a user's privacy.
 */
declare namespace browser.privacy.websites {
    /**
     * The mode for tracking protection.
     */
    /**
     * The mode for tracking protection.
     */
    type TrackingProtectionModeOption = string;
    /**
     * The settings for cookies.
     */
    interface CookieConfig {
        /**
         * The type of cookies to allow.
         */
        behavior?:
            | 'allow_all'
            | 'reject_all'
            | 'reject_third_party'
            | 'allow_visited'
            | 'reject_trackers'
            | 'reject_trackers_and_partition_foreign';
        /**
         * Whether to create all cookies as nonPersistent (i.e., session) cookies.
         */
        nonPersistentCookies?: boolean;
    }

    /**
     * If disabled, the browser blocks third-party sites from setting cookies. The value of this preference is of type boolean, and the default value is `true`.
     */
    const thirdPartyCookiesAllowed: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * If enabled, the browser sends auditing pings when requested by a website (`&lt;a ping&gt;`). The value of this preference is of type boolean, and the default value is `true`.
     */
    const hyperlinkAuditingEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * If enabled, the browser sends `referer` headers with your requests. Yes, the name of this preference doesn't match the misspelled header. No, we're not going to change it. The value of this preference is of type boolean, and the default value is `true`.
     */
    const referrersEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * If enabled, the browser attempts to appear similar to other users by reporting generic information to websites. This can prevent websites from uniquely identifying users. Examples of data that is spoofed include number of CPU cores, precision of JavaScript timers, the local timezone, and disabling features such as GamePad support, and the WebSpeech and Navigator APIs. The value of this preference is of type boolean, and the default value is `false`.
     */
    const resistFingerprinting: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * If enabled, the browser will associate all data (including cookies, HSTS data, cached images, and more) for any third party domains with the domain in the address bar. This prevents third party trackers from using directly stored information to identify you across different websites, but may break websites where you login with a third party account (such as a Facebook or Google login.) The value of this preference is of type boolean, and the default value is `false`.
     */
    const firstPartyIsolate: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * **Available on Windows and ChromeOS only**: If enabled, the browser provides a unique ID to plugins in order to run protected content. The value of this preference is of type boolean, and the default value is `true`.
     */
    const protectedContentEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Allow users to specify the mode for tracking protection. This setting's value is of type TrackingProtectionModeOption, defaulting to `private_browsing_only`.
     */
    const trackingProtectionMode: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Allow users to specify the default settings for allowing cookies, as well as whether all cookies should be created as non-persistent cookies. This setting's value is of type CookieConfig.
     */
    const cookieConfig: /* lookup type? "types.Setting" */ types.Setting;
}

/**
 * Use the `browser.runtime` API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
 */
declare namespace browser.runtime {
    /**
     * An object which allows two way communication with other pages.
     */
    interface Port {
        name: string;
        disconnect: /* or any?  */ () => void;
        /* x7 */

        onDisconnect: /* lookup type? "events.Event" */ events.Event;
        onMessage: /* lookup type? "events.Event" */ events.Event;
        postMessage: /* or any?  */ () => void;
        /* x7 */

        /**
         * This property will **only** be present on ports passed to onConnect/onConnectExternal listeners.
         */
        sender?: MessageSender;
    }

    /**
     * An object containing information about the script context that sent a message or request.
     */
    interface MessageSender {
        /**
         * The $(ref:tabs.Tab) which opened the connection, if any. This property will **only** be present when the connection was opened from a tab (including content scripts), and **only** if the receiver is an extension, not an app.
         */
        tab?: /* lookup type? "tabs.Tab" */ tabs.Tab;
        /**
         * The $(topic:frame_ids)[frame] that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when `tab` is set.
         */
        frameId?: number;
        /**
         * The ID of the extension or app that opened the connection, if any.
         */
        id?: string;
        /**
         * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
         */
        url?: string;
    }

    /**
     * The operating system the browser is running on.
     */
    /**
     * The operating system the browser is running on.
     */
    type PlatformOs = string;
    /**
     * The machine's processor architecture.
     */
    /**
     * The machine's processor architecture.
     */
    type PlatformArch = string;
    /**
     * An object containing information about the current platform.
     */
    interface PlatformInfo {
        /**
         * The operating system the browser is running on.
         */
        os: PlatformOs;
        /**
         * The machine's processor architecture.
         */
        arch: PlatformArch;
    }

    /**
     * An object containing information about the current browser.
     */
    interface BrowserInfo {
        /**
         * The name of the browser, for example 'Firefox'.
         */
        name: string;
        /**
         * The name of the browser vendor, for example 'Mozilla'.
         */
        vendor: string;
        /**
         * The browser's version, for example '42.0.0' or '0.8.1pre'.
         */
        version: string;
        /**
         * The browser's build ID/date, for example '20160101'.
         */
        buildID: string;
    }

    /**
     * Result of the update check.
     */
    /**
     * Result of the update check.
     */
    type RequestUpdateCheckStatus = string;
    /**
     * The reason that this event is being dispatched.
     */
    /**
     * The reason that this event is being dispatched.
     */
    type OnInstalledReason = string;
    /**
     * The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.
     */
    /**
     * The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.
     */
    type OnRestartRequiredReason = string;
    /**
     * Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
     */
    function getBackgroundPage(): Promise</* "unknown" undefined */ object>;
    /**
     * <p>Open your Extension's options page, if possible.</p><p>The precise behavior may depend on your manifest's `$(topic:optionsV2)[options_ui]` or `$(topic:options)[options_page]` key, or what the browser happens to support at the time.</p><p>If your Extension does not declare an options page, or the browser failed to create one for some other reason, the callback will set $(ref:lastError).</p>
     */
    function openOptionsPage(): Promise<void>;
    /**
     * Returns details about the app or extension from the manifest. The object returned is a serialization of the full $(topic:manifest)[manifest file].
     */
    function getManifest(): object;
    /**
     * Converts a relative path within an app/extension install directory to a fully-qualified URL.
     */
    function getURL(
        /**
         * A path to a resource within an app/extension expressed relative to its install directory.
         */ path: string
    ): string;
    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
     */
    function setUninstallURL(
        /**
         * URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
         */ url?: string
    ): Promise<void>;
    /**
     * Reloads the app or extension.
     */
    function reload(): void;
    /**
     * Requests an update check for this app/extension.
     */
    function requestUpdateCheck(): Promise<RequestUpdateCheckStatus>;
    /**
     * Restart the device when the app runs in kiosk mode. Otherwise, it's no-op.
     */
    function restart(): void;
    /**
     * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and $(topic:manifest/externally_connectable)[web messaging]. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via $(ref:tabs.connect).
     */
    function connect(
        /**
         * The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for $(topic:manifest/externally_connectable)[web messaging].
         */ extensionId?: string,
        connectInfo?: {
            /**
             * Will be passed into onConnect for processes that are listening for the connection event.
             */
            name?: string;
            /**
             * Whether the TLS channel ID will be passed into onConnectExternal for processes that are listening for the connection event.
             */
            includeTlsChannelId?: boolean;
        }
    ): undefined;
    /**
     * Connects to a native application in the host machine.
     */
    function connectNative(
        /**
         * The name of the registered application to connect to.
         */ application: string
    ): undefined;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to $(ref:runtime.connect) but only sends a single message, with an optional response. If sending to your extension, the $(ref:runtime.onMessage) event will be fired in each page, or $(ref:runtime.onMessageExternal), if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use $(ref:tabs.sendMessage).
     */
    function sendMessage(
        /**
         * The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for $(topic:manifest/externally_connectable)[web messaging].
         */ extensionId: string,
        message: any,
        options: {}
    ): Promise<any>;
    function sendMessage(message: any, options: {}): Promise<any>;
    function sendMessage(message: any): Promise<any>;
    /**
     * Send a single message to a native application.
     */
    function sendNativeMessage(
        /**
         * The name of the native messaging host.
         */ application: string,
        /**
         * The message that will be passed to the native messaging host.
         */ message: any
    ): Promise<any>;
    /**
     * Returns information about the current browser.
     */
    function getBrowserInfo(): Promise<BrowserInfo>;
    /**
     * Returns information about the current platform.
     */
    function getPlatformInfo(): Promise<PlatformInfo>;
    /**
     * Returns a DirectoryEntry for the package directory.
     */
    function getPackageDirectoryEntry(): Promise<
        /* "unknown" undefined */ object
    >;
    const /* 1 of 11 */ onStartup: EventHandler</**
         * Fired when a profile that has this extension installed first starts up. This event is not fired for incognito profiles.
         */
        () => void>;
    const /* 2 of 11 */ onInstalled: EventHandler</**
         * Fired when the extension is first installed, when the extension is updated to a new version, and when the browser is updated to a new version.
         */
        (details: {
            /**
             * The reason that this event is being dispatched.
             */
            reason: OnInstalledReason;
            /**
             * Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'.
             */
            previousVersion?: string;
            /**
             * Indicates whether the addon is installed as a temporary extension.
             */
            temporary: boolean;
        }) => void>;
    const /* 3 of 11 */ onSuspend: EventHandler</**
         * Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded.
         */
        () => void>;
    const /* 4 of 11 */ onSuspendCanceled: EventHandler</**
         * Sent after onSuspend to indicate that the app won't be unloaded after all.
         */
        () => void>;
    const /* 5 of 11 */ onUpdateAvailable: EventHandler</**
         * Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call $(ref:runtime.reload). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call $(ref:runtime.reload) manually in response to this event the update will not get installed until the next time the browser itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if $(ref:runtime.reload) is called in response to this event.
         */
        (
            /**
             * The manifest details of the available update.
             */

            details: {
                /**
                 * The version number of the available update.
                 */
                version: string;
            }
        ) => void>;
    const /* 6 of 11 */ onBrowserUpdateAvailable: EventHandler</**
         * Fired when an update for the browser is available, but isn't installed immediately because a browser restart is required.
         */
        () => void>;
    const /* 7 of 11 */ onConnect: EventHandler</**
         * Fired when a connection is made from either an extension process or a content script.
         */
        (port: Port) => void>;
    const /* 8 of 11 */ onConnectExternal: EventHandler</**
         * Fired when a connection is made from another extension.
         */
        (port: Port) => void>;
    const /* 9 of 11 */ onMessage: EventHandler<
            /**
             * Fired when a message is sent from either an extension process or a content script.
             */
            | ((
                  /**
                   * The message sent by the calling script.
                   */

                  message: any,
                  sender: MessageSender,
                  /**
                   * Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object. If you have more than one `onMessage` listener in the same document, then only one may send a response. This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until `sendResponse` is called).
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              boolean)
            | ((
                  sender: MessageSender,
                  /**
                   * Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object. If you have more than one `onMessage` listener in the same document, then only one may send a response. This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until `sendResponse` is called).
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              boolean)
        >;
    const /* 10 of 11 */ onMessageExternal: EventHandler<
            /**
             * Fired when a message is sent from another extension/app. Cannot be used in a content script.
             */
            | ((
                  /**
                   * The message sent by the calling script.
                   */

                  message: any,
                  sender: MessageSender,
                  /**
                   * Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object. If you have more than one `onMessage` listener in the same document, then only one may send a response. This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until `sendResponse` is called).
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              boolean)
            | ((
                  sender: MessageSender,
                  /**
                   * Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object. If you have more than one `onMessage` listener in the same document, then only one may send a response. This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until `sendResponse` is called).
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              boolean)
        >;
    const /* 11 of 11 */ onRestartRequired: EventHandler</**
         * Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.
         */
        (
            /**
             * The reason that the event is being dispatched.
             */

            reason: OnRestartRequiredReason
        ) => void>;
    /**
     * This will be defined during an API method callback if there was an error
     */
    const lastError = undefined;
    /**
     * The ID of the extension/app.
     */
    const id = undefined;
}

/**
 * Use the `browser.contextualIdentities` API to query and modify contextual identity, also called as containers.
 */
declare namespace browser.contextualIdentities {
    /**
     * Represents information about a contextual identity.
     */
    interface ContextualIdentity {
        /**
         * The name of the contextual identity.
         */
        name: string;
        /**
         * The icon name of the contextual identity.
         */
        icon: string;
        /**
         * The icon url of the contextual identity.
         */
        iconUrl: string;
        /**
         * The color name of the contextual identity.
         */
        color: string;
        /**
         * The color hash of the contextual identity.
         */
        colorCode: string;
        /**
         * The cookie store ID of the contextual identity.
         */
        cookieStoreId: string;
    }

    /**
     * Retrieves information about a single contextual identity.
     */
    function get(
        /**
         * The ID of the contextual identity cookie store.
         */ cookieStoreId: string
    ): Promise<any>;
    /**
     * Retrieves all contextual identities
     */
    function query(
        /**
         * Information to filter the contextual identities being retrieved.
         */ details: {
            /**
             * Filters the contextual identity by name.
             */
            name?: string;
        }
    ): Promise<any>;
    /**
     * Creates a contextual identity with the given data.
     */
    function create(
        /**
         * Details about the contextual identity being created.
         */ details: {
            /**
             * The name of the contextual identity.
             */
            name: string;
            /**
             * The color of the contextual identity.
             */
            color: string;
            /**
             * The icon of the contextual identity.
             */
            icon: string;
        }
    ): Promise<any>;
    /**
     * Updates a contextual identity with the given data.
     */
    function update(
        /**
         * The ID of the contextual identity cookie store.
         */ cookieStoreId: string,
        /**
         * Details about the contextual identity being created.
         */ details: {
            /**
             * The name of the contextual identity.
             */
            name?: string;
            /**
             * The color of the contextual identity.
             */
            color?: string;
            /**
             * The icon of the contextual identity.
             */
            icon?: string;
        }
    ): Promise<any>;
    /**
     * Deletes a contetual identity by its cookie Store ID.
     */
    function remove(
        /**
         * The ID of the contextual identity cookie store.
         */ cookieStoreId: string
    ): Promise<any>;
    const /* 1 of 3 */ onUpdated: EventHandler</**
         * Fired when a container is updated.
         */
        (changeInfo: {
            /**
             * Contextual identity that has been updated
             */
            contextualIdentity: ContextualIdentity;
        }) => void>;
    const /* 2 of 3 */ onCreated: EventHandler</**
         * Fired when a new container is created.
         */
        (changeInfo: {
            /**
             * Contextual identity that has been created
             */
            contextualIdentity: ContextualIdentity;
        }) => void>;
    const /* 3 of 3 */ onRemoved: EventHandler</**
         * Fired when a container is removed.
         */
        (changeInfo: {
            /**
             * Contextual identity that has been removed
             */
            contextualIdentity: ContextualIdentity;
        }) => void>;
}

/**
 * The `chrome.events` namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
 */
declare namespace browser.events {
    /**
     * Description of a declarative rule for handling events.
     */
    interface Rule {
        /**
         * Optional identifier that allows referencing this rule.
         */
        id?: string;
        /**
         * Tags can be used to annotate rules and perform operations on sets of rules.
         */
        tags?: string[];
        /**
         * List of conditions that can trigger the actions.
         */
        conditions: any[];
        /**
         * List of actions that are triggered if one of the condtions is fulfilled.
         */
        actions: any[];
        /**
         * Optional priority of this rule. Defaults to 100.
         */
        priority?: number;
    }

    /**
     * An object which allows the addition and removal of listeners for a Chrome event.
     */
    interface Event {
        /**
         * Registers an event listener *callback* to an event.
         */

        addListener(): void;

        /**
         * Deregisters an event listener *callback* from an event.
         */

        removeListener(): void;

        hasListener(): boolean;

        hasListeners(): boolean;

        /**
         * Registers rules to handle events.
         */

        addRules(
            /**
             * Name of the event this function affects.
             */ eventName: string,
            /**
             * If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
             */ webViewInstanceId: number,
            /**
             * Rules to be registered. These do not replace previously registered rules.
             */ rules: Rule[]
        ): void;

        /**
         * Returns currently registered rules.
         */

        getRules(
            /**
             * Name of the event this function affects.
             */ eventName: string,
            /**
             * If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
             */ webViewInstanceId: number,
            /**
             * If an array is passed, only rules with identifiers contained in this array are returned.
             */ ruleIdentifiers?: string[]
        ): void;

        /**
         * Unregisters currently registered rules.
         */

        removeRules(
            /**
             * Name of the event this function affects.
             */ eventName: string,
            /**
             * If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
             */ webViewInstanceId: number,
            /**
             * If an array is passed, only rules with identifiers contained in this array are unregistered.
             */ ruleIdentifiers?: string[]
        ): void;
    }

    /**
     * Filters URLs for various criteria. See <a href='events#filtered'>event filtering</a>. All criteria are case sensitive.
     */
    interface UrlFilter {
        /**
         * Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.
         */
        hostContains?: string;
        /**
         * Matches if the host name of the URL is equal to a specified string.
         */
        hostEquals?: string;
        /**
         * Matches if the host name of the URL starts with a specified string.
         */
        hostPrefix?: string;
        /**
         * Matches if the host name of the URL ends with a specified string.
         */
        hostSuffix?: string;
        /**
         * Matches if the path segment of the URL contains a specified string.
         */
        pathContains?: string;
        /**
         * Matches if the path segment of the URL is equal to a specified string.
         */
        pathEquals?: string;
        /**
         * Matches if the path segment of the URL starts with a specified string.
         */
        pathPrefix?: string;
        /**
         * Matches if the path segment of the URL ends with a specified string.
         */
        pathSuffix?: string;
        /**
         * Matches if the query segment of the URL contains a specified string.
         */
        queryContains?: string;
        /**
         * Matches if the query segment of the URL is equal to a specified string.
         */
        queryEquals?: string;
        /**
         * Matches if the query segment of the URL starts with a specified string.
         */
        queryPrefix?: string;
        /**
         * Matches if the query segment of the URL ends with a specified string.
         */
        querySuffix?: string;
        /**
         * Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.
         */
        urlContains?: string;
        /**
         * Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.
         */
        urlEquals?: string;
        /**
         * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2 syntax</a>.
         */
        urlMatches?: string;
        /**
         * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2 syntax</a>.
         */
        originAndPathMatches?: string;
        /**
         * Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.
         */
        urlPrefix?: string;
        /**
         * Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.
         */
        urlSuffix?: string;
        /**
         * Matches if the scheme of the URL is equal to any of the schemes specified in the array.
         */
        schemes?: string[];
        /**
         * Matches if the port of the URL is contained in any of the specified port lists. For example `[80, 443, [1000, 1200]]` matches all requests on port 80, 443 and in the range 1000-1200.
         */
        ports?: [];
    }
}

/**
 * Contains types used by other schemas.
 */
declare namespace browser.types {
    /**
     * The scope of the Setting. One of<ul><li><var>regular</var>: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),</li><li><var>regular_only</var>: setting for the regular profile only (not inherited by the incognito profile),</li><li><var>incognito_persistent</var>: setting for the incognito profile that survives browser restarts (overrides regular preferences),</li><li><var>incognito_session_only</var>: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).</li></ul> Only <var>regular</var> is supported by Firefox at this time.
     */
    /**
     * The scope of the Setting. One of<ul><li><var>regular</var>: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),</li><li><var>regular_only</var>: setting for the regular profile only (not inherited by the incognito profile),</li><li><var>incognito_persistent</var>: setting for the incognito profile that survives browser restarts (overrides regular preferences),</li><li><var>incognito_session_only</var>: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).</li></ul> Only <var>regular</var> is supported by Firefox at this time.
     */
    type SettingScope = string;
    /**
     * One of<ul><li><var>not_controllable</var>: cannot be controlled by any extension</li><li><var>controlled_by_other_extensions</var>: controlled by extensions with higher precedence</li><li><var>controllable_by_this_extension</var>: can be controlled by this extension</li><li><var>controlled_by_this_extension</var>: controlled by this extension</li></ul>
     */
    /**
     * One of<ul><li><var>not_controllable</var>: cannot be controlled by any extension</li><li><var>controlled_by_other_extensions</var>: controlled by extensions with higher precedence</li><li><var>controllable_by_this_extension</var>: can be controlled by this extension</li><li><var>controlled_by_this_extension</var>: controlled by this extension</li></ul>
     */
    type LevelOfControl = string;
    interface Setting {
        /**
         * Gets the value of a setting.
         */

        get(
            /**
             * Which setting to consider.
             */ details: {
                /**
                 * Whether to return the value that applies to the incognito session (default false).
                 */
                incognito?: boolean;
            }
        ): Promise<{
            /**
             * The value of the setting.
             */
            value: any;
            /**
             * The level of control of the setting.
             */
            levelOfControl: /* lookup type? "types.LevelOfControl" */ types.LevelOfControl;
            /**
             * Whether the effective value is specific to the incognito session.<br/>This property will *only* be present if the <var>incognito</var> property in the <var>details</var> parameter of `get()` was true.
             */
            incognitoSpecific?: boolean;
        }>;

        /**
         * Sets the value of a setting.
         */

        set(
            /**
             * Which setting to change.
             */ details: {
                /**
                 * The value of the setting. <br/>Note that every setting has a specific value type, which is described together with the setting. An extension should *not* set a value of a different type.
                 */
                value: any;
                /**
                 * Where to set the setting (default: regular).
                 */
                scope?: /* lookup type? "types.SettingScope" */ types.SettingScope;
            }
        ): Promise<void>;

        /**
         * Clears the setting, restoring any default value.
         */

        clear(
            /**
             * Which setting to clear.
             */ details: {
                /**
                 * Where to clear the setting (default: regular).
                 */
                scope?: /* lookup type? "types.SettingScope" */ types.SettingScope;
            }
        ): Promise<void>;
    }
}

/**
 * This API provides the ability to determine the status of and detect changes in the network connection. This API can only be used in privileged extensions.
 */
declare namespace browser.networkStatus {
    interface NetworkLinkInfo {
        /**
         * Status of the network link, if "unknown" then link is usually assumed to be "up"
         */
        status: 'unknown' | 'up' | 'down';
        /**
         * If known, the type of network connection that is avialable.
         */
        type:
            | 'unknown'
            | 'ethernet'
            | 'usb'
            | 'wifi'
            | 'wimax'
            | '2g'
            | '3g'
            | '4g';
        /**
         * If known, the network id or name.
         */
        id?: string;
    }

    /**
     * Returns the $(ref:NetworkLinkInfo} of the current network connection.
     */
    function getLinkInfo(): Promise<any>;
    const /* 1 of 1 */ onConnectionChanged: EventHandler</**
         * Fired when the network connection state changes.
         */
        (details: NetworkLinkInfo) => void>;
}

/**
 * Provides access to global proxy settings for Firefox and proxy event listeners to handle dynamic proxy implementations.
 */
declare namespace browser.proxy {
    /**
     * An object which describes proxy settings.
     */
    interface ProxyConfig {
        /**
         * The type of proxy to use.
         */
        proxyType?: 'none' | 'autoDetect' | 'system' | 'manual' | 'autoConfig';
        /**
         * The address of the http proxy, can include a port.
         */
        http?: string;
        /**
         * Use the http proxy server for all protocols.
         */
        httpProxyAll?: boolean;
        /**
         * The address of the ftp proxy, can include a port.
         */
        ftp?: string;
        /**
         * The address of the ssl proxy, can include a port.
         */
        ssl?: string;
        /**
         * The address of the socks proxy, can include a port.
         */
        socks?: string;
        /**
         * The version of the socks proxy.
         */
        socksVersion?: number;
        /**
         * A list of hosts which should not be proxied.
         */
        passthrough?: string;
        /**
         * A URL to use to configure the proxy.
         */
        autoConfigUrl?: string;
        /**
         * Do not prompt for authentication if password is saved.
         */
        autoLogin?: boolean;
        /**
         * Proxy DNS when using SOCKS v5.
         */
        proxyDNS?: boolean;
        /**
         *  If true (the default value), do not use newer TLS protocol features that might have interoperability problems on the Internet. This is intended only for use with critical infrastructure like the updates, and is only available to privileged addons.
         */
        respectBeConservative?: boolean;
    }

    const /* 1 of 2 */ onRequest: EventHandler</**
         * Fired when proxy data is needed for a request.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: /* lookup type? "webRequest.ResourceType" */ webRequest.ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * Indicates if this response was fetched from disk cache.
             */
            fromCache: boolean;
            /**
             * The HTTP request headers that are going to be sent out with this request.
             */
            requestHeaders?: /* lookup type? "webRequest.HttpHeaders" */ webRequest.HttpHeaders;
            /**
             * Url classification if the request has been classified.
             */
            urlClassification: /* lookup type? "webRequest.UrlClassification" */ webRequest.UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => void>;
    const /* 2 of 2 */ onError: EventHandler</**
         * Notifies about errors caused by the invalid use of the proxy API.
         */
        (error: /* "unknown" undefined */ object) => void>;
    /**
     * Configures proxy settings. This setting's value is an object of type ProxyConfig.
     */
    const settings: /* lookup type? "types.Setting" */ types.Setting;
}

/**
 * Use the `browser.i18n` infrastructure to implement internationalization across your whole app or extension.
 */
declare namespace browser.i18n {
    /**
     * An ISO language code such as `en` or `fr`. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. For an unknown language, `und` will be returned, which means that [percentage] of the text is unknown to CLD
     */
    /**
     * An ISO language code such as `en` or `fr`. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. For an unknown language, `und` will be returned, which means that [percentage] of the text is unknown to CLD
     */
    type LanguageCode = string;
    /**
     * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use $(ref:i18n.getUILanguage).
     */
    function getAcceptLanguages(): Promise<LanguageCode[]>;
    /**
     * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the `getMessage()` call is wrong &mdash; for example, *messageName* is not a string or the *substitutions* array has more than 9 elements &mdash; this method returns `undefined`.
     */
    function getMessage(
        /**
         * The name of the message, as specified in the `$(topic:i18n-messages)[messages.json]` file.
         */ messageName: string,
        /**
         * Substitution strings, if the message requires any.
         */ substitutions?: any
    ): string;
    /**
     * Gets the browser UI language of the browser. This is different from $(ref:i18n.getAcceptLanguages) which returns the preferred user languages.
     */
    function getUILanguage(): string;
    /**
     * Detects the language of the provided text using CLD.
     */
    function detectLanguage(
        /**
         * User input string to be translated.
         */ text: string
    ): Promise<{
        /**
         * CLD detected language reliability
         */
        isReliable: boolean;
        /**
         * array of detectedLanguage
         */
        languages: {
            language: LanguageCode;
            /**
             * The percentage of the detected language
             */
            percentage: number;
        }[];
    }>;
}

/**
 * Asynchronous DNS API
 */
declare namespace browser.dns {
    /**
     * An object encapsulating a DNS Record.
     */
    interface DNSRecord {
        /**
         * The canonical hostname for this record.  this value is empty if the record was not fetched with the 'canonical_name' flag.
         */
        canonicalName?: string;
        /**
         * Record retreived with TRR.
         */
        isTRR: string;
        addresses: string[];
    }

    /* skipped: ResolveFlags: array */
    type ResolveFlags =
        | 'allow_name_collisions'
        | 'bypass_cache'
        | 'canonical_name'
        | 'disable_ipv4'
        | 'disable_ipv6'
        | 'disable_trr'
        | 'offline'
        | 'priority_low'
        | 'priority_medium'
        | 'speculate'[];
    /**
     * Resolves a hostname to a DNS record.
     */
    function resolve(hostname: string, flags?: ResolveFlags): Promise<any>;
}

/**
 * The `browser.management` API provides ways to manage the list of extensions that are installed and running.
 */
declare namespace browser.management {
    /**
     * Information about an icon belonging to an extension.
     */
    interface IconInfo {
        /**
         * A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16.
         */
        size: number;
        /**
         * The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append `?grayscale=true` to the URL.
         */
        url: string;
    }

    /**
     * A reason the item is disabled.
     */
    /**
     * A reason the item is disabled.
     */
    type ExtensionDisabledReason = string;
    /**
     * The type of this extension, 'extension' or 'theme'.
     */
    /**
     * The type of this extension, 'extension' or 'theme'.
     */
    type ExtensionType = string;
    /**
     * How the extension was installed. One of<br><var>development</var>: The extension was loaded unpacked in developer mode,<br><var>normal</var>: The extension was installed normally via an .xpi file,<br><var>sideload</var>: The extension was installed by other software on the machine,<br><var>other</var>: The extension was installed by other means.
     */
    /**
     * How the extension was installed. One of<br><var>development</var>: The extension was loaded unpacked in developer mode,<br><var>normal</var>: The extension was installed normally via an .xpi file,<br><var>sideload</var>: The extension was installed by other software on the machine,<br><var>other</var>: The extension was installed by other means.
     */
    type ExtensionInstallType = string;
    /**
     * Information about an installed extension.
     */
    interface ExtensionInfo {
        /**
         * The extension's unique identifier.
         */
        id: string;
        /**
         * The name of this extension.
         */
        name: string;
        /**
         * A short version of the name of this extension.
         */
        shortName?: string;
        /**
         * The description of this extension.
         */
        description: string;
        /**
         * The <a href='manifest/version'>version</a> of this extension.
         */
        version: string;
        /**
         * The <a href='manifest/version#version_name'>version name</a> of this extension if the manifest specified one.
         */
        versionName?: string;
        /**
         * Whether this extension can be disabled or uninstalled by the user.
         */
        mayDisable: boolean;
        /**
         * Whether it is currently enabled or disabled.
         */
        enabled: boolean;
        /**
         * A reason the item is disabled.
         */
        disabledReason?: ExtensionDisabledReason;
        /**
         * The type of this extension, 'extension' or 'theme'.
         */
        type: ExtensionType;
        /**
         * The URL of the homepage of this extension.
         */
        homepageUrl?: string;
        /**
         * The update URL of this extension.
         */
        updateUrl?: string;
        /**
         * The url for the item's options page, if it has one.
         */
        optionsUrl: string;
        /**
         * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the <a href='manifest/icons'>manifest documentation on icons</a> for more details.
         */
        icons?: IconInfo[];
        /**
         * Returns a list of API based permissions.
         */
        permissions?: string[];
        /**
         * Returns a list of host based permissions.
         */
        hostPermissions?: string[];
        /**
         * How the extension was installed.
         */
        installType: ExtensionInstallType;
    }

    /**
     * Returns a list of information about installed extensions.
     */
    function getAll(): Promise<ExtensionInfo[]>;
    /**
     * Returns information about the installed extension that has the given ID.
     */
    function get(
        /**
         * The ID from an item of $(ref:management.ExtensionInfo).
         */ id: /* lookup type? "manifest.ExtensionID" */ manifest.ExtensionID
    ): Promise<ExtensionInfo>;
    /**
     * Installs and enables a theme extension from the given url.
     */
    function install(options: {
        /**
         * URL pointing to the XPI file on addons.mozilla.org or similar.
         */
        url: /* lookup type? "manifest.HttpURL" */ manifest.HttpURL;
        /**
         * A hash of the XPI file, using sha256 or stronger.
         */
        hash?: string;
    }): Promise<{
        id: /* lookup type? "manifest.ExtensionID" */ manifest.ExtensionID;
    }>;
    /**
     * Returns information about the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest.
     */
    function getSelf(): Promise<ExtensionInfo>;
    /**
     * Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest.
     */
    function uninstallSelf(options?: {
        /**
         * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false.
         */
        showConfirmDialog?: boolean;
        /**
         * The message to display to a user when being asked to confirm removal of the extension.
         */
        dialogMessage?: string;
    }): Promise<void>;
    /**
     * Enables or disables the given add-on.
     */
    function setEnabled(
        /**
         * ID of the add-on to enable/disable.
         */ id: string,
        /**
         * Whether to enable or disable the add-on.
         */ enabled: boolean
    ): Promise<void>;
    const /* 1 of 4 */ onDisabled: EventHandler</**
         * Fired when an addon has been disabled.
         */
        (info: ExtensionInfo) => void>;
    const /* 2 of 4 */ onEnabled: EventHandler</**
         * Fired when an addon has been enabled.
         */
        (info: ExtensionInfo) => void>;
    const /* 3 of 4 */ onInstalled: EventHandler</**
         * Fired when an addon has been installed.
         */
        (info: ExtensionInfo) => void>;
    const /* 4 of 4 */ onUninstalled: EventHandler</**
         * Fired when an addon has been uninstalled.
         */
        (info: ExtensionInfo) => void>;
}

declare namespace browser.downloads {
    type FilenameConflictAction = string;
    type InterruptReason = string;
    /**
     * <dl><dt>file</dt><dd>The download's filename is suspicious.</dd><dt>url</dt><dd>The download's URL is known to be malicious.</dd><dt>content</dt><dd>The downloaded file is known to be malicious.</dd><dt>uncommon</dt><dd>The download's URL is not commonly downloaded and could be dangerous.</dd><dt>safe</dt><dd>The download presents no known danger to the user's computer.</dd></dl>These string constants will never change, however the set of DangerTypes may change.
     */
    /**
     * <dl><dt>file</dt><dd>The download's filename is suspicious.</dd><dt>url</dt><dd>The download's URL is known to be malicious.</dd><dt>content</dt><dd>The downloaded file is known to be malicious.</dd><dt>uncommon</dt><dd>The download's URL is not commonly downloaded and could be dangerous.</dd><dt>safe</dt><dd>The download presents no known danger to the user's computer.</dd></dl>These string constants will never change, however the set of DangerTypes may change.
     */
    type DangerType = string;
    /**
     * <dl><dt>in_progress</dt><dd>The download is currently receiving data from the server.</dd><dt>interrupted</dt><dd>An error broke the connection with the file host.</dd><dt>complete</dt><dd>The download completed successfully.</dd></dl>These string constants will never change, however the set of States may change.
     */
    /**
     * <dl><dt>in_progress</dt><dd>The download is currently receiving data from the server.</dd><dt>interrupted</dt><dd>An error broke the connection with the file host.</dd><dt>complete</dt><dd>The download completed successfully.</dd></dl>These string constants will never change, however the set of States may change.
     */
    type State = string;
    interface DownloadItem {
        /**
         * An identifier that is persistent across browser sessions.
         */
        id: number;
        /**
         * Absolute URL.
         */
        url: string;
        referrer?: string;
        /**
         * Absolute local path.
         */
        filename: string;
        /**
         * False if this download is recorded in the history, true if it is not recorded.
         */
        incognito: boolean;
        /**
         * Indication of whether this download is thought to be safe or known to be suspicious.
         */
        danger: DangerType;
        /**
         * The file's MIME type.
         */
        mime?: string;
        /**
         * Number of milliseconds between the unix epoch and when this download began.
         */
        startTime: string;
        /**
         * Number of milliseconds between the unix epoch and when this download ended.
         */
        endTime?: string;
        estimatedEndTime?: string;
        /**
         * Indicates whether the download is progressing, interrupted, or complete.
         */
        state: State;
        /**
         * True if the download has stopped reading data from the host, but kept the connection open.
         */
        paused: boolean;
        canResume: boolean;
        /**
         * Number indicating why a download was interrupted.
         */
        error?: InterruptReason;
        /**
         * Number of bytes received so far from the host, without considering file compression.
         */
        bytesReceived: number;
        /**
         * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
         */
        totalBytes: number;
        /**
         * Number of bytes in the whole file post-decompression, or -1 if unknown.
         */
        fileSize: number;
        exists: boolean;
        byExtensionId?: string;
        byExtensionName?: string;
    }

    interface StringDelta {
        current?: string;
        previous?: string;
    }

    interface DoubleDelta {
        current?: number;
        previous?: number;
    }

    interface BooleanDelta {
        current?: boolean;
        previous?: boolean;
    }

    /**
     * A time specified as a Date object, a number or string representing milliseconds since the epoch, or an ISO 8601 string
     */
    /* skipped: DownloadTime: undefined */
    type DownloadTime =
        | string
        | /* lookup type? "extensionTypes.Date" */ extensionTypes.Date;
    /**
     * Parameters that combine to specify a predicate that can be used to select a set of downloads.  Used for example in search() and erase()
     */
    interface DownloadQuery {
        /**
         * This array of search terms limits results to <a href='#type-DownloadItem'>DownloadItems</a> whose `filename` or `url` contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash.
         */
        query?: string[];
        /**
         * Limits results to downloads that started before the given ms since the epoch.
         */
        startedBefore?: DownloadTime;
        /**
         * Limits results to downloads that started after the given ms since the epoch.
         */
        startedAfter?: DownloadTime;
        /**
         * Limits results to downloads that ended before the given ms since the epoch.
         */
        endedBefore?: DownloadTime;
        /**
         * Limits results to downloads that ended after the given ms since the epoch.
         */
        endedAfter?: DownloadTime;
        /**
         * Limits results to downloads whose totalBytes is greater than the given integer.
         */
        totalBytesGreater?: number;
        /**
         * Limits results to downloads whose totalBytes is less than the given integer.
         */
        totalBytesLess?: number;
        /**
         * Limits results to <a href='#type-DownloadItem'>DownloadItems</a> whose `filename` matches the given regular expression.
         */
        filenameRegex?: string;
        /**
         * Limits results to <a href='#type-DownloadItem'>DownloadItems</a> whose `url` matches the given regular expression.
         */
        urlRegex?: string;
        /**
         * Setting this integer limits the number of results. Otherwise, all matching <a href='#type-DownloadItem'>DownloadItems</a> will be returned.
         */
        limit?: number;
        /**
         * Setting elements of this array to <a href='#type-DownloadItem'>DownloadItem</a> properties in order to sort the search results. For example, setting `orderBy='startTime'` sorts the <a href='#type-DownloadItem'>DownloadItems</a> by their start time in ascending order. To specify descending order, prefix `orderBy` with a hyphen: '-startTime'.
         */
        orderBy?: string[];
        id?: number;
        /**
         * Absolute URL.
         */
        url?: string;
        /**
         * Absolute local path.
         */
        filename?: string;
        /**
         * Indication of whether this download is thought to be safe or known to be suspicious.
         */
        danger?: DangerType;
        /**
         * The file's MIME type.
         */
        mime?: string;
        startTime?: string;
        endTime?: string;
        /**
         * Indicates whether the download is progressing, interrupted, or complete.
         */
        state?: State;
        /**
         * True if the download has stopped reading data from the host, but kept the connection open.
         */
        paused?: boolean;
        /**
         * Why a download was interrupted.
         */
        error?: InterruptReason;
        /**
         * Number of bytes received so far from the host, without considering file compression.
         */
        bytesReceived?: number;
        /**
         * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
         */
        totalBytes?: number;
        /**
         * Number of bytes in the whole file post-decompression, or -1 if unknown.
         */
        fileSize?: number;
        exists?: boolean;
    }

    /**
     * Download a URL. If the URL uses the HTTP[S] protocol, then the request will include all cookies currently set for its hostname. If both `filename` and `saveAs` are specified, then the Save As dialog will be displayed, pre-populated with the specified `filename`. If the download started successfully, `callback` will be called with the new <a href='#type-DownloadItem'>DownloadItem</a>'s `downloadId`. If there was an error starting the download, then `callback` will be called with `downloadId=undefined` and <a href='extension.html#property-lastError'>chrome.extension.lastError</a> will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. You must not parse it.
     */
    function download(
        /**
         * What to download and how.
         */ options: {
            /**
             * The URL to download.
             */
            url: string;
            /**
             * A file path relative to the Downloads directory to contain the downloaded file.
             */
            filename?: string;
            /**
             * Whether to associate the download with a private browsing session.
             */
            incognito?: boolean;
            conflictAction?: FilenameConflictAction;
            /**
             * Use a file-chooser to allow the user to select a filename. If the option is not specified, the file chooser will be shown only if the Firefox "Always ask you where to save files" option is enabled (i.e. the pref `browser.download.useDownloadDir` is set to `false`).
             */
            saveAs?: boolean;
            /**
             * The HTTP method to use if the URL uses the HTTP[S] protocol.
             */
            method?: 'GET' | 'POST';
            /**
             * Extra HTTP headers to send with the request if the URL uses the HTTP[s] protocol. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`, restricted to those allowed by XMLHttpRequest.
             */
            headers?: {
                /**
                 * Name of the HTTP header.
                 */
                name: string;
                /**
                 * Value of the HTTP header.
                 */
                value: string;
            }[];
            /**
             * Post body.
             */
            body?: string;
            /**
             * When this flag is set to `true`, then the browser will allow downloads to proceed after encountering HTTP errors such as `404 Not Found`.
             */
            allowHttpErrors?: boolean;
        }
    ): Promise<number>;
    /**
     * Find <a href='#type-DownloadItem'>DownloadItems</a>. Set `query` to the empty object to get all <a href='#type-DownloadItem'>DownloadItems</a>. To get a specific <a href='#type-DownloadItem'>DownloadItem</a>, set only the `id` field.
     */
    function search(query: DownloadQuery): Promise<DownloadItem[]>;
    /**
     * Pause the download. If the request was successful the download is in a paused state. Otherwise <a href='extension.html#property-lastError'>chrome.extension.lastError</a> contains an error message. The request will fail if the download is not active.
     */
    function pause(
        /**
         * The id of the download to pause.
         */ downloadId: number
    ): Promise<void>;
    /**
     * Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise <a href='extension.html#property-lastError'>chrome.extension.lastError</a> contains an error message. The request will fail if the download is not active.
     */
    function resume(
        /**
         * The id of the download to resume.
         */ downloadId: number
    ): Promise<void>;
    /**
     * Cancel a download. When `callback` is run, the download is cancelled, completed, interrupted or doesn't exist anymore.
     */
    function cancel(
        /**
         * The id of the download to cancel.
         */ downloadId: number
    ): Promise<void>;
    /**
     * Retrieve an icon for the specified download. For new downloads, file icons are available after the <a href='#event-onCreated'>onCreated</a> event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, <a href='extension.html#property-lastError'>chrome.extension.lastError</a> will contain an error message.
     */
    function getFileIcon(
        /**
         * The identifier for the download.
         */ downloadId: number,
        options?: {
            /**
             * The size of the icon.  The returned icon will be square with dimensions size * size pixels.  The default size for the icon is 32x32 pixels.
             */
            size?: number;
        }
    ): Promise<string>;
    /**
     * Open the downloaded file.
     */
    function open(downloadId: number): Promise<void>;
    /**
     * Show the downloaded file in its folder in a file manager.
     */
    function show(downloadId: number): Promise<boolean>;
    function showDefaultFolder(): void;
    /**
     * Erase matching <a href='#type-DownloadItem'>DownloadItems</a> from history
     */
    function erase(query: DownloadQuery): Promise<number[]>;
    function removeFile(downloadId: number): Promise<void>;
    /**
     * Prompt the user to either accept or cancel a dangerous download. `acceptDanger()` does not automatically accept dangerous downloads.
     */
    function acceptDanger(downloadId: number): void;
    /**
     * Initiate dragging the file to another application.
     */
    function drag(downloadId: number): void;
    function setShelfEnabled(enabled: boolean): void;
    const /* 1 of 3 */ onCreated: EventHandler</**
         * This event fires with the <a href='#type-DownloadItem'>DownloadItem</a> object when a download begins.
         */
        (downloadItem: DownloadItem) => void>;
    const /* 2 of 3 */ onErased: EventHandler</**
         * Fires with the `downloadId` when a download is erased from history.
         */
        (
            /**
             * The `id` of the <a href='#type-DownloadItem'>DownloadItem</a> that was erased.
             */

            downloadId: number
        ) => void>;
    const /* 3 of 3 */ onChanged: EventHandler</**
         * When any of a <a href='#type-DownloadItem'>DownloadItem</a>'s properties except `bytesReceived` changes, this event fires with the `downloadId` and an object containing the properties that changed.
         */
        (downloadDelta: {
            /**
             * The `id` of the <a href='#type-DownloadItem'>DownloadItem</a> that changed.
             */
            id: number;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `url`.
             */
            url?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `filename`.
             */
            filename?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `danger`.
             */
            danger?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `mime`.
             */
            mime?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `startTime`.
             */
            startTime?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `endTime`.
             */
            endTime?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `state`.
             */
            state?: StringDelta;
            canResume?: BooleanDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `paused`.
             */
            paused?: BooleanDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `error`.
             */
            error?: StringDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `totalBytes`.
             */
            totalBytes?: DoubleDelta;
            /**
             * Describes a change in a <a href='#type-DownloadItem'>DownloadItem</a>'s `fileSize`.
             */
            fileSize?: DoubleDelta;
            exists?: BooleanDelta;
        }) => void>;
}

/**
 * Use the `browser.idle` API to detect when the machine's idle state changes.
 */
declare namespace browser.idle {
    type IdleState = string;
    /**
     * Returns "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
     */
    function queryState(
        /**
         * The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
         */ detectionIntervalInSeconds: number
    ): Promise<IdleState>;
    /**
     * Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
     */
    function setDetectionInterval(
        /**
         * Threshold, in seconds, used to determine when the system is in an idle state.
         */ intervalInSeconds: number
    ): void;
    const /* 1 of 1 */ onStateChanged: EventHandler</**
         * Fired when the system changes to an active or idle state. The event fires with "idle" if the the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system.
         */
        (newState: IdleState) => void>;
}

declare namespace browser.userScripts {
    /**
     * Details of a user script
     */
    interface UserScriptOptions {
        /**
         * The list of JS files to inject
         */
        js: /* z8array */ extensionTypes.ExtensionFileOrCode[];
        /**
         * An opaque user script metadata value
         */
        scriptMetadata?: /* lookup type? "extensionTypes.PlainJSONValue" */ extensionTypes.PlainJSONValue;
        matches: /* z8array */ manifest.MatchPattern[];
        excludeMatches?: /* z8array */ manifest.MatchPattern[];
        includeGlobs?: string[];
        excludeGlobs?: string[];
        /**
         * If allFrames is `true`, implies that the JavaScript should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
         */
        allFrames?: boolean;
        /**
         * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
         */
        matchAboutBlank?: boolean;
        /**
         * The soonest that the JavaScript will be injected into the tab. Defaults to "document_idle".
         */
        runAt?: /* lookup type? "extensionTypes.RunAt" */ extensionTypes.RunAt;
    }

    /**
     * An object that represents a user script registered programmatically
     */
    interface RegisteredUserScript {
        /**
         * Unregister a user script registered programmatically
         */

        unregister(): Promise<any>;
    }

    /**
     * Register a user script programmatically given its $(ref:userScripts.UserScriptOptions), and resolves to a $(ref:userScripts.RegisteredUserScript) instance
     */
    function register(userScriptOptions: UserScriptOptions): Promise<any>;
    const /* 1 of 1 */ onBeforeScript: EventHandler</**
         * Event called when a new userScript global has been created
         */
        (userScript: {
            /**
             * The userScript metadata (as set in userScripts.register)
             */
            metadata: any;
            /**
             * The userScript global
             */
            global: any;
            /**
             * Exports all the properties of a given plain object as userScript globals
             */
            defineGlobals: /* or any?  */ (
                /**
                 * A plain object whose properties are exported as userScript globals
                 */

                sourceObject: /* "unknown" undefined */ object
            ) => void;
            /* x7 */

            /**
             * Convert a given value to make it accessible to the userScript code
             */
            export: /* or any?  */ (
                /**
                 * A value to convert into an object accessible to the userScript
                 */

                value: any
            ) => any;
            /* x7 */
        }) => void>;
}

/**
 * Use the `browser.pageAction` API to put icons inside the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages.
 */
declare namespace browser.pageAction {
    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a `canvas` element).
     */
    interface ImageDataType {}

    /**
     * Information sent when a page action is clicked.
     */
    interface OnClickData {
        /**
         * An array of keyboard modifiers that were held while the menu item was clicked.
         */
        modifiers: 'Shift' | 'Alt' | 'Command' | 'Ctrl' | 'MacCtrl'[];
        /**
         * An integer value of button by which menu item was clicked.
         */
        button?: number;
    }

    /**
     * Shows the page action. The page action is shown whenever the tab is selected.
     */
    function show(
        /**
         * The id of the tab for which you want to modify the page action.
         */ tabId: number
    ): Promise<void>;
    /**
     * Hides the page action.
     */
    function hide(
        /**
         * The id of the tab for which you want to modify the page action.
         */ tabId: number
    ): Promise<void>;
    /**
     * Checks whether the page action is shown.
     */
    function isShown(details: {
        /**
         * Specify the tab to get the shownness from.
         */
        tabId: number;
    }): Promise<any>;
    /**
     * Sets the title of the page action. This is displayed in a tooltip over the page action.
     */
    function setTitle(details: {
        /**
         * The id of the tab for which you want to modify the page action.
         */
        tabId: number;
        /**
         * The tooltip string.
         */
        title: string | void /* could not determine correct type */;
    }): void;
    /**
     * Gets the title of the page action.
     */
    function getTitle(details: {
        /**
         * Specify the tab to get the title from.
         */
        tabId: number;
    }): Promise<string>;
    /**
     * Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    function setIcon(details: {
        /**
         * The id of the tab for which you want to modify the page action.
         */
        tabId: number;
        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
         */
        imageData?: ImageDataType | /* "unknown" undefined */ object;
        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
         */
        path?: string | /* "unknown" undefined */ object;
    }): Promise<void>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the page action's icon.
     */
    function setPopup(details: {
        /**
         * The id of the tab for which you want to modify the page action.
         */
        tabId: number;
        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup is shown.
         */
        popup: string | void /* could not determine correct type */;
    }): Promise<any>;
    /**
     * Gets the html document set as the popup for this page action.
     */
    function getPopup(details: {
        /**
         * Specify the tab to get the popup from.
         */
        tabId: number;
    }): Promise<string>;
    /**
     * Opens the extension page action in the active window.
     */
    function openPopup(): Promise<any>;
    const /* 1 of 1 */ onClicked: EventHandler</**
         * Fired when a page action icon is clicked.  This event will not fire if the page action has a popup.
         */
        (
            tab: /* lookup type? "tabs.Tab" */ tabs.Tab,
            info?: OnClickData
        ) => void>;
}

declare namespace browser.experiments {
    interface ExperimentAPI {
        schema: ExperimentURL;
        parent?: {
            events?: APIEvents;
            paths?: APIPaths;
            script: ExperimentURL;
            scopes?: APIParentScope[];
        };
        child?: {
            paths: APIPaths;
            script: ExperimentURL;
            scopes: APIChildScope[];
        };
    }

    type ExperimentURL = string;
    /* skipped: APIPaths: array */
    type APIPaths = APIPath[];
    /* skipped: APIPath: array */
    type APIPath = string[];
    /* skipped: APIEvents: array */
    type APIEvents = APIEvent[];
    type APIEvent = string;
    type APIParentScope = string;
    type APIChildScope = string;
}

/**
 * Exposes the browser's profiler.
 */
declare namespace browser.geckoProfiler {
    type ProfilerFeature = string;
    type supports = string;
    /**
     * Starts the profiler with the specified settings.
     */
    function start(settings: {
        /**
         * The maximum size in bytes of the buffer used to store profiling data. A larger value allows capturing a profile that covers a greater amount of time.
         */
        bufferSize: number;
        /**
         * The length of the window of time that's kept in the buffer. Any collected samples are discarded as soon as they are older than the number of seconds specified in this setting. Zero means no duration restriction.
         */
        windowLength?: number;
        /**
         * Interval in milliseconds between samples of profiling data. A smaller value will increase the detail of the profiles captured.
         */
        interval: number;
        /**
         * A list of active features for the profiler.
         */
        features: ProfilerFeature[];
        /**
         * A list of thread names for which to capture profiles.
         */
        threads?: string[];
    }): Promise<any>;
    /**
     * Stops the profiler and discards any captured profile data.
     */
    function stop(): Promise<any>;
    /**
     * Pauses the profiler, keeping any profile data that is already written.
     */
    function pause(): Promise<any>;
    /**
     * Resumes the profiler with the settings that were initially used to start it.
     */
    function resume(): Promise<any>;
    /**
     * Gathers the profile data from the current profiling session, and writes it to disk. The returned promise resolves to a path that locates the created file.
     */
    function dumpProfileToFile(
        /**
         * The name of the file inside the profile/profiler directory
         */ fileName: string
    ): Promise<any>;
    /**
     * Gathers the profile data from the current profiling session.
     */
    function getProfile(): Promise<any>;
    /**
     * Gathers the profile data from the current profiling session. The returned promise resolves to an array buffer that contains a JSON string.
     */
    function getProfileAsArrayBuffer(): Promise<any>;
    /**
     * Gathers the profile data from the current profiling session. The returned promise resolves to an array buffer that contains a gzipped JSON string.
     */
    function getProfileAsGzippedArrayBuffer(): Promise<any>;
    /**
     * Gets the debug symbols for a particular library.
     */
    function getSymbols(
        /**
         * The name of the library's debug file. For example, 'xul.pdb
         */ debugName: string,
        /**
         * The Breakpad ID of the library
         */ breakpadId: string
    ): Promise<any>;
    const /* 1 of 1 */ onRunning: EventHandler</**
         * Fires when the profiler starts/stops running.
         */
        (
            /**
             * Whether the profiler is running or not. Pausing the profiler will not affect this value.
             */

            isRunning: boolean
        ) => void>;
}

/**
 * Use the chrome.identity API to get OAuth2 access tokens.
 */
declare namespace browser.identity {
    /**
     * An object encapsulating an OAuth account id.
     */
    interface AccountInfo {
        /**
         * A unique identifier for the account. This ID will not change for the lifetime of the account.
         */
        id: string;
    }

    /**
     * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
     */
    function getAccounts(): Promise<AccountInfo[]>;
    /**
     * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
     */
    function getAuthToken(details?: {
        interactive?: boolean;
        account?: AccountInfo;
        scopes?: string[];
    }): Promise<AccountInfo[]>;
    /**
     * Retrieves email address and obfuscated gaia id of the user signed into a profile.
     */
    function getProfileUserInfo(): Promise<{
        email: string;
        id: string;
    }>;
    /**
     * Removes an OAuth2 access token from the Identity API's token cache.
     */
    function removeCachedAuthToken(details: {
        token: string;
    }): Promise<{
        email: string;
        id: string;
    }>;
    /**
     * Starts an auth flow at the specified URL.
     */
    function launchWebAuthFlow(details: {
        url: /* lookup type? "manifest.HttpURL" */ manifest.HttpURL;
        interactive?: boolean;
    }): Promise<string>;
    /**
     * Generates a redirect URL to be used in |launchWebAuthFlow|.
     */
    function getRedirectURL(
        /**
         * The path appended to the end of the generated URL.
         */ path?: string
    ): string;
    const /* 1 of 1 */ onSignInChanged: EventHandler</**
         * Fired when signin state changes for an account on the user's profile.
         */
        (account: AccountInfo, signedIn: boolean) => void>;
}

/**
 * Offers the ability to write to the clipboard. Reading is not supported because the clipboard can already be read through the standard web platform APIs.
 */
declare namespace browser.clipboard {
    /**
     * Copy an image to the clipboard. The image is re-encoded before it is written to the clipboard. If the image is invalid, the clipboard is not modified.
     */
    function setImageData(
        /**
         * The image data to be copied.
         */ imageData: /* "unknown" undefined */ object,
        /**
         * The type of imageData.
         */ imageType: 'jpeg' | 'png'
    ): Promise<any>;
}

/**
 * The `browser.extensionTypes` API contains type declarations for WebExtensions.
 */
declare namespace browser.extensionTypes {
    /**
     * The format of an image.
     */
    /**
     * The format of an image.
     */
    type ImageFormat = string;
    /**
     * Details about the format and quality of an image.
     */
    interface ImageDetails {
        /**
         * The format of the resulting image.  Default is `"jpeg"`.
         */
        format?: ImageFormat;
        /**
         * When format is `"jpeg"`, controls the quality of the resulting image.  This value is ignored for PNG images.  As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
         */
        quality?: number;
    }

    /**
     * The soonest that the JavaScript or CSS will be injected into the tab.
     */
    /**
     * The soonest that the JavaScript or CSS will be injected into the tab.
     */
    type RunAt = string;
    /**
     * The origin of the CSS to inject, this affects the cascading order (priority) of the stylesheet.
     */
    /**
     * The origin of the CSS to inject, this affects the cascading order (priority) of the stylesheet.
     */
    type CSSOrigin = string;
    /**
     * Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     */
    interface InjectDetails {
        /**
         * JavaScript or CSS code to inject.<br><br>**Warning:**<br>Be careful using the `code` parameter. Incorrect use of it may open your extension to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting">cross site scripting</a> attacks.
         */
        code?: string;
        /**
         * JavaScript or CSS file to inject.
         */
        file?: string;
        /**
         * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
         */
        allFrames?: boolean;
        /**
         * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
         */
        matchAboutBlank?: boolean;
        /**
         * The ID of the frame to inject the script into. This may not be used in combination with `allFrames`.
         */
        frameId?: number;
        /**
         * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
         */
        runAt?: RunAt;
        /**
         * The css origin of the stylesheet to inject. Defaults to "author".
         */
        cssOrigin?: CSSOrigin;
    }

    /* skipped: Date: undefined */
    type Date = string | number | /* "unknown" undefined */ object;
    /* skipped: ExtensionFileOrCode: undefined */
    type ExtensionFileOrCode =
        | {
              file: /* lookup type? "manifest.ExtensionURL" */ manifest.ExtensionURL;
          }
        | {
              code: string;
          };
    /**
     * A plain JSON value
     */
    /* skipped: PlainJSONValue: undefined */
    type PlainJSONValue =
        | void /* could not determine correct type */
        | number
        | string
        | boolean
        | PlainJSONValue[]
        | /* "unknown" undefined */ object;
}

/**
 * Use the `browser.telemetry` API to send telemetry data to the Mozilla Telemetry service. Restricted to Mozilla privileged webextensions.
 */
declare namespace browser.telemetry {
    /**
     * Type of scalar: 'count' for numeric values, 'string' for string values, 'boolean' for boolean values. Maps to `nsITelemetry.SCALAR_TYPE_*`.
     */
    /**
     * Type of scalar: 'count' for numeric values, 'string' for string values, 'boolean' for boolean values. Maps to `nsITelemetry.SCALAR_TYPE_*`.
     */
    type ScalarType = string;
    /**
     * Represents registration data for a Telemetry scalar.
     */
    interface ScalarData {
        kind: ScalarType;
        /**
         * True if this is a keyed scalar.
         */
        keyed?: boolean;
        /**
         * True if this data should be recorded on release.
         */
        record_on_release?: boolean;
        /**
         * True if this scalar entry is expired. This allows recording it without error, but it will be discarded.
         */
        expired?: boolean;
    }

    /**
     * Represents registration data for a Telemetry event.
     */
    interface EventData {
        /**
         * List of methods for this event entry.
         */
        methods: string[];
        /**
         * List of objects for this event entry.
         */
        objects: string[];
        /**
         * List of allowed extra keys for this event entry.
         */
        extra_keys: string[];
        /**
         * True if this data should be recorded on release.
         */
        record_on_release?: boolean;
        /**
         * True if this event entry is expired. This allows recording it without error, but it will be discarded.
         */
        expired?: boolean;
    }

    /**
     * Submits a custom ping to the Telemetry back-end. See `submitExternalPing` inside TelemetryController.jsm for more details.
     */
    function submitPing(
        /**
         * The type of the ping.
         */ type: string,
        /**
         * The data payload for the ping.
         */ message: /* "unknown" undefined */ object,
        /**
         * Options object.
         */ options: {
            /**
             * True if the ping should contain the client id.
             */
            addClientId?: boolean;
            /**
             * True if the ping should contain the environment data.
             */
            addEnvironment?: boolean;
            /**
             * Set to override the environment data.
             */
            overrideEnvironment?: /* "unknown" undefined */ object;
            /**
             * If true, send the ping using the PingSender.
             */
            usePingSender?: boolean;
        }
    ): Promise<any>;
    /**
     * Submits a custom ping to the Telemetry back-end, with an encrypted payload. Requires a telemetry entry in the manifest to be used.
     */
    function submitEncryptedPing(
        /**
         * The data payload for the ping, which will be encrypted.
         */ message: /* "unknown" undefined */ object,
        /**
         * Options object.
         */ options: {
            /**
             * Schema name used for payload.
             */
            schemaName: string;
            /**
             * Schema version used for payload.
             */
            schemaVersion: number;
        }
    ): Promise<any>;
    /**
     * Checks if Telemetry upload is enabled.
     */
    function canUpload(): Promise<any>;
    /**
     * Adds the value to the given scalar.
     */
    function scalarAdd(
        /**
         * The scalar name.
         */ name: string,
        /**
         * The numeric value to add to the scalar. Only unsigned integers supported.
         */ value: number
    ): Promise<any>;
    /**
     * Sets the named scalar to the given value. Throws if the value type doesn't match the scalar type.
     */
    function scalarSet(
        /**
         * The scalar name
         */ name: string,
        /**
         * The value to set the scalar to
         */ value: string | boolean | number | /* "unknown" undefined */ object
    ): Promise<any>;
    /**
     * Sets the scalar to the maximum of the current and the passed value
     */
    function scalarSetMaximum(
        /**
         * The scalar name.
         */ name: string,
        /**
         * The numeric value to set the scalar to. Only unsigned integers supported.
         */ value: number
    ): Promise<any>;
    /**
     * Adds the value to the given keyed scalar.
     */
    function keyedScalarAdd(
        /**
         * The scalar name
         */ name: string,
        /**
         * The key name
         */ key: string,
        /**
         * The numeric value to add to the scalar. Only unsigned integers supported.
         */ value: number
    ): Promise<any>;
    /**
     * Sets the keyed scalar to the given value. Throws if the value type doesn't match the scalar type.
     */
    function keyedScalarSet(
        /**
         * The scalar name.
         */ name: string,
        /**
         * The key name.
         */ key: string,
        /**
         * The value to set the scalar to.
         */ value: string | boolean | number | /* "unknown" undefined */ object
    ): Promise<any>;
    /**
     * Sets the keyed scalar to the maximum of the current and the passed value
     */
    function keyedScalarSetMaximum(
        /**
         * The scalar name.
         */ name: string,
        /**
         * The key name.
         */ key: string,
        /**
         * The numeric value to set the scalar to. Only unsigned integers supported.
         */ value: number
    ): Promise<any>;
    /**
     * Record an event in Telemetry. Throws when trying to record an unknown event.
     */
    function recordEvent(
        /**
         * The category name.
         */ category: string,
        /**
         * The method name.
         */ method: string,
        /**
         * The object name.
         */ object: string,
        /**
         * An optional string value to record.
         */ value?: string,
        /**
         * An optional object of the form (string -> string). It should only contain registered extra keys.
         */ extra?: /* "unknown" undefined */ object
    ): Promise<any>;
    /**
     * Register new scalars to record them from addons. See nsITelemetry.idl for more details.
     */
    function registerScalars(
        /**
         * The unique category the scalars are registered in.
         */ category: string,
        /**
         * An object that contains registration data for multiple scalars. Each property name is the scalar name, and the corresponding property value is an object of ScalarData type.
         */ data: /* "unknown" undefined */ object
    ): Promise<any>;
    /**
     * Register new events to record them from addons. See nsITelemetry.idl for more details.
     */
    function registerEvents(
        /**
         * The unique category the events are registered in.
         */ category: string,
        /**
         * An object that contains registration data for 1+ events. Each property name is the category name, and the corresponding property value is an object of EventData type.
         */ data: /* "unknown" undefined */ object
    ): Promise<any>;
    /**
     * Enable recording of events in a category. Events default to recording disabled. This allows to toggle recording for all events in the specified category.
     */
    function setEventRecordingEnabled(
        /**
         * The category name.
         */ category: string,
        /**
         * Whether recording is enabled for events in that category.
         */ enabled: boolean
    ): Promise<any>;
}

/**
 * Use the `browser.cookies` API to query and modify cookies, and to be notified when they change.
 */
declare namespace browser.cookies {
    /**
     * A cookie's 'SameSite' state (https://tools.ietf.org/html/draft-west-first-party-cookies). 'no_restriction' corresponds to a cookie set without a 'SameSite' attribute, 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'.
     */
    /**
     * A cookie's 'SameSite' state (https://tools.ietf.org/html/draft-west-first-party-cookies). 'no_restriction' corresponds to a cookie set without a 'SameSite' attribute, 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'.
     */
    type SameSiteStatus = string;
    /**
     * Represents information about an HTTP cookie.
     */
    interface Cookie {
        /**
         * The name of the cookie.
         */
        name: string;
        /**
         * The value of the cookie.
         */
        value: string;
        /**
         * The domain of the cookie (e.g. "www.google.com", "example.com").
         */
        domain: string;
        /**
         * True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie).
         */
        hostOnly: boolean;
        /**
         * The path of the cookie.
         */
        path: string;
        /**
         * True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS).
         */
        secure: boolean;
        /**
         * True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts).
         */
        httpOnly: boolean;
        /**
         * The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests).
         */
        sameSite: SameSiteStatus;
        /**
         * True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date.
         */
        session: boolean;
        /**
         * The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
         */
        expirationDate?: number;
        /**
         * The ID of the cookie store containing this cookie, as provided in getAllCookieStores().
         */
        storeId: string;
        /**
         * The first-party domain of the cookie.
         */
        firstPartyDomain: string;
    }

    /**
     * Represents a cookie store in the browser. An incognito mode window, for instance, uses a separate cookie store from a non-incognito window.
     */
    interface CookieStore {
        /**
         * The unique identifier for the cookie store.
         */
        id: string;
        /**
         * Identifiers of all the browser tabs that share this cookie store.
         */
        tabIds: number[];
        /**
         * Indicates if this is an incognito cookie store
         */
        incognito: boolean;
    }

    /**
     * The underlying reason behind the cookie's change. If a cookie was inserted, or removed via an explicit call to $(ref:cookies.remove), "cause" will be "explicit". If a cookie was automatically removed due to expiry, "cause" will be "expired". If a cookie was removed due to being overwritten with an already-expired expiration date, "cause" will be set to "expired_overwrite".  If a cookie was automatically removed due to garbage collection, "cause" will be "evicted".  If a cookie was automatically removed due to a "set" call that overwrote it, "cause" will be "overwrite". Plan your response accordingly.
     */
    /**
     * The underlying reason behind the cookie's change. If a cookie was inserted, or removed via an explicit call to $(ref:cookies.remove), "cause" will be "explicit". If a cookie was automatically removed due to expiry, "cause" will be "expired". If a cookie was removed due to being overwritten with an already-expired expiration date, "cause" will be set to "expired_overwrite".  If a cookie was automatically removed due to garbage collection, "cause" will be "evicted".  If a cookie was automatically removed due to a "set" call that overwrote it, "cause" will be "overwrite". Plan your response accordingly.
     */
    type OnChangedCause = string;
    /**
     * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
     */
    function get(
        /**
         * Details to identify the cookie being retrieved.
         */ details: {
            /**
             * The URL with which the cookie to retrieve is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail.
             */
            url: string;
            /**
             * The name of the cookie to retrieve.
             */
            name: string;
            /**
             * The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.
             */
            storeId?: string;
            /**
             * The first-party domain which the cookie to retrieve is associated. This attribute is required if First-Party Isolation is enabled.
             */
            firstPartyDomain?: string;
        }
    ): Promise<Cookie>;
    /**
     * Retrieves all cookies from a single cookie store that match the given information.  The cookies returned will be sorted, with those with the longest path first.  If multiple cookies have the same path length, those with the earliest creation time will be first.
     */
    function getAll(
        /**
         * Information to filter the cookies being retrieved.
         */ details: {
            /**
             * Restricts the retrieved cookies to those that would match the given URL.
             */
            url?: string;
            /**
             * Filters the cookies by name.
             */
            name?: string;
            /**
             * Restricts the retrieved cookies to those whose domains match or are subdomains of this one.
             */
            domain?: string;
            /**
             * Restricts the retrieved cookies to those whose path exactly matches this string.
             */
            path?: string;
            /**
             * Filters the cookies by their Secure property.
             */
            secure?: boolean;
            /**
             * Filters out session vs. persistent cookies.
             */
            session?: boolean;
            /**
             * The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.
             */
            storeId?: string;
            /**
             * Restricts the retrieved cookies to those whose first-party domains match this one. This attribute is required if First-Party Isolation is enabled. To not filter by a specific first-party domain, use `null` or `undefined`.
             */
            firstPartyDomain?: string;
        }
    ): Promise<Cookie[]>;
    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     */
    function set(
        /**
         * Details about the cookie being set.
         */ details: {
            /**
             * The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
             */
            url: string;
            /**
             * The name of the cookie. Empty by default if omitted.
             */
            name?: string;
            /**
             * The value of the cookie. Empty by default if omitted.
             */
            value?: string;
            /**
             * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
             */
            domain?: string;
            /**
             * The path of the cookie. Defaults to the path portion of the url parameter.
             */
            path?: string;
            /**
             * Whether the cookie should be marked as Secure. Defaults to false.
             */
            secure?: boolean;
            /**
             * Whether the cookie should be marked as HttpOnly. Defaults to false.
             */
            httpOnly?: boolean;
            /**
             * The cookie's same-site status.
             */
            sameSite?: SameSiteStatus;
            /**
             * The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.
             */
            expirationDate?: number;
            /**
             * The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.
             */
            storeId?: string;
            /**
             * The first-party domain of the cookie. This attribute is required if First-Party Isolation is enabled.
             */
            firstPartyDomain?: string;
        }
    ): Promise<Cookie>;
    /**
     * Deletes a cookie by name.
     */
    function remove(
        /**
         * Information to identify the cookie to remove.
         */ details: {
            /**
             * The URL associated with the cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
             */
            url: string;
            /**
             * The name of the cookie to remove.
             */
            name: string;
            /**
             * The ID of the cookie store to look in for the cookie. If unspecified, the cookie is looked for by default in the current execution context's cookie store.
             */
            storeId?: string;
            /**
             * The first-party domain associated with the cookie. This attribute is required if First-Party Isolation is enabled.
             */
            firstPartyDomain?: string;
        }
    ): Promise<{
        /**
         * The URL associated with the cookie that's been removed.
         */
        url: string;
        /**
         * The name of the cookie that's been removed.
         */
        name: string;
        /**
         * The ID of the cookie store from which the cookie was removed.
         */
        storeId: string;
        /**
         * The first-party domain associated with the cookie that's been removed.
         */
        firstPartyDomain: string;
    }>;
    /**
     * Lists all existing cookie stores.
     */
    function getAllCookieStores(): Promise<CookieStore[]>;
    const /* 1 of 1 */ onChanged: EventHandler</**
         * Fired when a cookie is set or removed. As a special case, note that updating a cookie's properties is implemented as a two step process: the cookie to be updated is first removed entirely, generating a notification with "cause" of "overwrite" .  Afterwards, a new cookie is written with the updated values, generating a second notification with "cause" "explicit".
         */
        (changeInfo: {
            /**
             * True if a cookie was removed.
             */
            removed: boolean;
            /**
             * Information about the cookie that was set or removed.
             */
            cookie: Cookie;
            /**
             * The underlying reason behind the cookie's change.
             */
            cause: OnChangedCause;
        }) => void>;
}

declare namespace browser.notifications {
    type TemplateType = string;
    type PermissionLevel = string;
    interface NotificationItem {
        /**
         * Title of one item of a list notification.
         */
        title: string;
        /**
         * Additional details about this item.
         */
        message: string;
    }

    interface CreateNotificationOptions {
        /**
         * Which type of notification to display.
         */
        type: TemplateType;
        /**
         * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
         */
        iconUrl?: string;
        /**
         * A URL to the app icon mask.
         */
        appIconMaskUrl?: string;
        /**
         * Title of the notification (e.g. sender name for email).
         */
        title: string;
        /**
         * Main notification content.
         */
        message: string;
        /**
         * Alternate notification content with a lower-weight font.
         */
        contextMessage?: string;
        /**
         * Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default.
         */
        priority?: number;
        /**
         * A timestamp associated with the notification, in milliseconds past the epoch.
         */
        eventTime?: number;
        /**
         * A URL to the image thumbnail for image-type notifications.
         */
        imageUrl?: string;
        /**
         * Items for multi-item notifications.
         */
        items?: NotificationItem[];
        /**
         * Current progress ranges from 0 to 100.
         */
        progress?: number;
        /**
         * Whether to show UI indicating that the app will visibly respond to clicks on the body of a notification.
         */
        isClickable?: boolean;
    }

    interface UpdateNotificationOptions {
        /**
         * Which type of notification to display.
         */
        type?: TemplateType;
        /**
         * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
         */
        iconUrl?: string;
        /**
         * A URL to the app icon mask.
         */
        appIconMaskUrl?: string;
        /**
         * Title of the notification (e.g. sender name for email).
         */
        title?: string;
        /**
         * Main notification content.
         */
        message?: string;
        /**
         * Alternate notification content with a lower-weight font.
         */
        contextMessage?: string;
        /**
         * Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default.
         */
        priority?: number;
        /**
         * A timestamp associated with the notification, in milliseconds past the epoch.
         */
        eventTime?: number;
        /**
         * A URL to the image thumbnail for image-type notifications.
         */
        imageUrl?: string;
        /**
         * Items for multi-item notifications.
         */
        items?: NotificationItem[];
        /**
         * Current progress ranges from 0 to 100.
         */
        progress?: number;
        /**
         * Whether to show UI indicating that the app will visibly respond to clicks on the body of a notification.
         */
        isClickable?: boolean;
    }

    /**
     * Creates and displays a notification.
     */
    function create(
        /**
         * Identifier of the notification. If it is empty, this method generates an id. If it matches an existing notification, this method first clears that notification before proceeding with the create operation.
         */ notificationId: string,
        /**
         * Contents of the notification.
         */ options: CreateNotificationOptions
    ): Promise<string>;
    function create(
        /**
         * Contents of the notification.
         */ options: CreateNotificationOptions
    ): Promise<string>;
    /**
     * Updates an existing notification.
     */
    function update(
        /**
         * The id of the notification to be updated.
         */ notificationId: string,
        /**
         * Contents of the notification to update to.
         */ options: UpdateNotificationOptions
    ): Promise<boolean>;
    /**
     * Clears an existing notification.
     */
    function clear(
        /**
         * The id of the notification to be updated.
         */ notificationId: string
    ): Promise<boolean>;
    /**
     * Retrieves all the notifications.
     */
    function getAll(): Promise</* "unknown" undefined */ object>;
    /**
     * Retrieves whether the user has enabled notifications from this app or extension.
     */
    function getPermissionLevel(): Promise<PermissionLevel>;
    const /* 1 of 6 */ onClosed: EventHandler</**
         * Fired when the notification closed, either by the system or by user action.
         */
        (
            /**
             * The notificationId of the closed notification.
             */

            notificationId: string,
            /**
             * True if the notification was closed by the user.
             */ byUser: boolean
        ) => void>;
    const /* 2 of 6 */ onClicked: EventHandler</**
         * Fired when the user clicked in a non-button area of the notification.
         */
        (
            /**
             * The notificationId of the clicked notification.
             */

            notificationId: string
        ) => void>;
    const /* 3 of 6 */ onButtonClicked: EventHandler</**
         * Fired when the  user pressed a button in the notification.
         */
        (
            /**
             * The notificationId of the clicked notification.
             */

            notificationId: string,
            /**
             * The index of the button clicked by the user.
             */ buttonIndex: number
        ) => void>;
    const /* 4 of 6 */ onPermissionLevelChanged: EventHandler</**
         * Fired when the user changes the permission level.
         */
        (
            /**
             * The new permission level.
             */

            level: PermissionLevel
        ) => void>;
    const /* 5 of 6 */ onShowSettings: EventHandler</**
         * Fired when the user clicked on a link for the app's notification settings.
         */
        () => void>;
    const /* 6 of 6 */ onShown: EventHandler</**
         * Fired when the notification is shown.
         */
        (
            /**
             * The notificationId of the shown notification.
             */

            notificationId: string
        ) => void>;
}

/**
 * Use the `browser.webNavigation` API to receive notifications about the status of navigation requests in-flight.
 */
declare namespace browser.webNavigation {
    /**
     * Cause of the navigation. The same transition types as defined in the history API are used. These are the same transition types as defined in the $(topic:transition_types)[history API] except with `"start_page"` in place of `"auto_toplevel"` (for backwards compatibility).
     */
    /**
     * Cause of the navigation. The same transition types as defined in the history API are used. These are the same transition types as defined in the $(topic:transition_types)[history API] except with `"start_page"` in place of `"auto_toplevel"` (for backwards compatibility).
     */
    type TransitionType = string;
    type TransitionQualifier = string;
    interface EventUrlFilters {
        url: /* z8array */ events.UrlFilter[];
    }

    /**
     * Retrieves information about the given frame. A frame refers to an &lt;iframe&gt; or a &lt;frame&gt; of a web page and is identified by a tab ID and a frame ID.
     */
    function getFrame(
        /**
         * Information about the frame to retrieve information about.
         */ details: {
            /**
             * The ID of the tab in which the frame is.
             */
            tabId: number;
            /**
             * The ID of the process runs the renderer for this tab.
             */
            processId?: number;
            /**
             * The ID of the frame in the given tab.
             */
            frameId: number;
        }
    ): Promise<{
        /**
         * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
         */
        errorOccurred?: boolean;
        /**
         * The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists.
         */
        url: string;
        /**
         * The ID of the tab in which the frame is.
         */
        tabId: number;
        /**
         * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
         */
        frameId: number;
        /**
         * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
         */
        parentFrameId: number;
    }>;
    /**
     * Retrieves information about all frames of a given tab.
     */
    function getAllFrames(
        /**
         * Information about the tab to retrieve all frames from.
         */ details: {
            /**
             * The ID of the tab.
             */
            tabId: number;
        }
    ): Promise<
        {
            /**
             * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
             */
            errorOccurred?: boolean;
            /**
             * The ID of the tab in which the frame is.
             */
            tabId: number;
            /**
             * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
             */
            parentFrameId: number;
            /**
             * The URL currently associated with this frame.
             */
            url: string;
        }[]
    >;
    const /* 1 of 9 */ onBeforeNavigate: EventHandler</**
         * Fired when a navigation is about to occur.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation is about to occur.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique for a given tab and process.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
             */
            parentFrameId: number;
            /**
             * The time when the browser was about to start the navigation, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 2 of 9 */ onCommitted: EventHandler</**
         * Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation occurs.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * The time when the navigation was committed, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 3 of 9 */ onDOMContentLoaded: EventHandler</**
         * Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation occurs.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * The time when the page's DOM was fully constructed, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 4 of 9 */ onCompleted: EventHandler</**
         * Fired when a document, including the resources it refers to, is completely loaded and initialized.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation occurs.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * The time when the document finished loading, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 5 of 9 */ onErrorOccurred: EventHandler</**
         * Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation occurs.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * The time when the error occurred, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 6 of 9 */ onCreatedNavigationTarget: EventHandler</**
         * Fired when a new window, or a new tab in an existing window, is created to host a navigation.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation is triggered.
             */
            sourceTabId: number;
            /**
             * The ID of the process runs the renderer for the source tab.
             */
            sourceProcessId: number;
            /**
             * The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame.
             */
            sourceFrameId: number;
            /**
             * The URL to be opened in the new window.
             */
            url: string;
            /**
             * The ID of the tab in which the url is opened
             */
            tabId: number;
            /**
             * The time when the browser was about to create a new view, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 7 of 9 */ onReferenceFragmentUpdated: EventHandler</**
         * Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation occurs.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * The time when the navigation was committed, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 8 of 9 */ onTabReplaced: EventHandler</**
         * Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab.
         */
        (details: {
            /**
             * The ID of the tab that was replaced.
             */
            replacedTabId: number;
            /**
             * The ID of the tab that replaced the old tab.
             */
            tabId: number;
            /**
             * The time when the replacement happened, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
    const /* 9 of 9 */ onHistoryStateUpdated: EventHandler</**
         * Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL.
         */
        (details: {
            /**
             * The ID of the tab in which the navigation occurs.
             */
            tabId: number;
            url: string;
            /**
             * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * The time when the navigation was committed, in milliseconds since the epoch.
             */
            timeStamp: number;
        }) => void>;
}

/**
 * Use the `browser.browserSettings` API to control global settings of the browser.
 */
declare namespace browser.browserSettings {
    /**
     * How images should be animated in the browser.
     */
    /**
     * How images should be animated in the browser.
     */
    type ImageAnimationBehavior = string;
    /**
     * After which mouse event context menus should popup.
     */
    /**
     * After which mouse event context menus should popup.
     */
    type ContextMenuMouseEvent = string;
    /**
     * Allows or disallows pop-up windows from opening in response to user events.
     */
    const allowPopupsForUserEvents: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Enables or disables the browser cache.
     */
    const cacheEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether the selected tab can be closed with a double click.
     */
    const closeTabsByDoubleClick: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Controls after which mouse event context menus popup. This setting's value is of type ContextMenuMouseEvent, which has possible values of `mouseup` and `mousedown`.
     */
    const contextMenuShowEvent: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether the FTP protocol is enabled.
     */
    const ftpProtocolEnabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Returns the value of the overridden home page. Read-only.
     */
    const homepageOverride: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Controls the behaviour of image animation in the browser. This setting's value is of type ImageAnimationBehavior, defaulting to `normal`.
     */
    const imageAnimationBehavior: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Returns the value of the overridden new tab page. Read-only.
     */
    const newTabPageOverride: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Controls where new tabs are opened. `afterCurrent` will open all new tabs next to the current tab, `relatedAfterCurrent` will open only related tabs next to the current tab, and `atEnd` will open all tabs at the end of the tab strip. The default is `relatedAfterCurrent`.
     */
    const newTabPosition: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether bookmarks are opened in the current tab or in a new tab.
     */
    const openBookmarksInNewTabs: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether search results are opened in the current tab or in a new tab.
     */
    const openSearchResultsInNewTabs: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether urlbar results are opened in the current tab or in a new tab.
     */
    const openUrlbarResultsInNewTabs: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * Disables webAPI notifications.
     */
    const webNotificationsDisabled: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This setting controls whether the user-chosen colors override the page's colors.
     */
    const overrideDocumentColors: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This setting controls whether the document's fonts are used.
     */
    const useDocumentFonts: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether zoom is applied to the full page or to text only.
     */
    const zoomFullPage: /* lookup type? "types.Setting" */ types.Setting;
    /**
     * This boolean setting controls whether zoom is applied on a per-site basis or to the current tab only. If privacy.resistFingerprinting is true, this setting has no effect and zoom is applied to the current tab only.
     */
    const zoomSiteSpecific: /* lookup type? "types.Setting" */ types.Setting;
}

/**
 * Monitor extension activity
 */
declare namespace browser.activityLog {
    const /* 1 of 1 */ onExtensionActivity: EventHandler</**
         * Receives an activityItem for each logging event.
         */
        (details: {
            /**
             * The date string when this call is triggered.
             */
            timeStamp: /* lookup type? "extensionTypes.Date" */ extensionTypes.Date;
            /**
             * The type of log entry.  api_call is a function call made by the extension and api_event is an event callback to the extension.  content_script is logged when a content script is injected.
             */
            type: 'api_call' | 'api_event' | 'content_script' | 'user_script';
            /**
             * The type of view where the activity occurred.  Content scripts will not have a viewType.
             */
            viewType?:
                | 'background'
                | 'popup'
                | 'sidebar'
                | 'tab'
                | 'devtools_page'
                | 'devtools_panel';
            /**
             * The name of the api call or event, or the script url if this is a content or user script event.
             */
            name: string;
            data: {
                /**
                 * A list of arguments passed to the call.
                 */
                args?: any[];
                /**
                 * The result of the call.
                 */
                result?: /* "unknown" undefined */ object;
                /**
                 * The tab associated with this event if it is a tab or content script.
                 */
                tabId?: number;
                /**
                 * If the type is content_script, this is the url of the script that was injected.
                 */
                url?: string;
            };
        }) => void>;
}

declare namespace browser.alarms {
    interface Alarm {
        /**
         * Name of this alarm.
         */
        name: string;
        /**
         * Time when the alarm is scheduled to fire, in milliseconds past the epoch.
         */
        scheduledTime: number;
        /**
         * When present, signals that the alarm triggers periodically after so many minutes.
         */
        periodInMinutes?: number;
    }

    /**
     * Creates an alarm. After the delay is expired, the onAlarm event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
     */
    function create(
        /**
         * Optional name to identify this alarm. Defaults to the empty string.
         */ name: string,
        /**
         * Details about the alarm. The alarm first fires either at 'when' milliseconds past the epoch (if 'when' is provided), after 'delayInMinutes' minutes from the current time (if 'delayInMinutes' is provided instead), or after 'periodInMinutes' minutes from the current time (if only 'periodInMinutes' is provided). Users should never provide both 'when' and 'delayInMinutes'. If 'periodInMinutes' is provided, then the alarm recurs repeatedly after that many minutes.
         */ alarmInfo: {
            /**
             * Time when the alarm is scheduled to first fire, in milliseconds past the epoch.
             */
            when?: number;
            /**
             * Number of minutes from the current time after which the alarm should first fire.
             */
            delayInMinutes?: number;
            /**
             * Number of minutes after which the alarm should recur repeatedly.
             */
            periodInMinutes?: number;
        }
    ): void;
    function create(
        /**
         * Details about the alarm. The alarm first fires either at 'when' milliseconds past the epoch (if 'when' is provided), after 'delayInMinutes' minutes from the current time (if 'delayInMinutes' is provided instead), or after 'periodInMinutes' minutes from the current time (if only 'periodInMinutes' is provided). Users should never provide both 'when' and 'delayInMinutes'. If 'periodInMinutes' is provided, then the alarm recurs repeatedly after that many minutes.
         */ alarmInfo: {
            /**
             * Time when the alarm is scheduled to first fire, in milliseconds past the epoch.
             */
            when?: number;
            /**
             * Number of minutes from the current time after which the alarm should first fire.
             */
            delayInMinutes?: number;
            /**
             * Number of minutes after which the alarm should recur repeatedly.
             */
            periodInMinutes?: number;
        }
    ): void;
    /**
     * Retrieves details about the specified alarm.
     */
    function get(
        /**
         * The name of the alarm to get. Defaults to the empty string.
         */ name?: string
    ): Promise<Alarm>;
    /**
     * Gets an array of all the alarms.
     */
    function getAll(): Promise<Alarm[]>;
    /**
     * Clears the alarm with the given name.
     */
    function clear(
        /**
         * The name of the alarm to clear. Defaults to the empty string.
         */ name?: string
    ): Promise<boolean>;
    /**
     * Clears all alarms.
     */
    function clearAll(): Promise<boolean>;
    const /* 1 of 1 */ onAlarm: EventHandler</**
         * Fired when an alarm has expired. Useful for transient background pages.
         */
        (
            /**
             * The alarm that has expired.
             */

            name: Alarm
        ) => void>;
}

declare namespace browser.contentScripts {
    /**
     * Details of a content script registered programmatically
     */
    interface RegisteredContentScriptOptions {
        matches: /* z8array */ manifest.MatchPattern[];
        excludeMatches?: /* z8array */ manifest.MatchPattern[];
        includeGlobs?: string[];
        excludeGlobs?: string[];
        /**
         * The list of CSS files to inject
         */
        css?: /* z8array */ extensionTypes.ExtensionFileOrCode[];
        /**
         * The list of JS files to inject
         */
        js?: /* z8array */ extensionTypes.ExtensionFileOrCode[];
        /**
         * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame.
         */
        allFrames?: boolean;
        /**
         * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
         */
        matchAboutBlank?: boolean;
        /**
         * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
         */
        runAt?: /* lookup type? "extensionTypes.RunAt" */ extensionTypes.RunAt;
    }

    /**
     * An object that represents a content script registered programmatically
     */
    interface RegisteredContentScript {
        /**
         * Unregister a content script registered programmatically
         */

        unregister(): Promise<any>;
    }

    /**
     * Register a content script programmatically
     */
    function register(
        contentScriptOptions: RegisteredContentScriptOptions
    ): Promise<any>;
}

/**
 * The `browser.extension` API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in $(topic:messaging)[Message Passing].
 */
declare namespace browser.extension {
    /**
     * The type of extension view.
     */
    /**
     * The type of extension view.
     */
    type ViewType = string;
    /**
     * Converts a relative path within an extension install directory to a fully-qualified URL.
     */
    function getURL(
        /**
         * A path to a resource within an extension expressed relative to its install directory.
         */ path: string
    ): string;
    /**
     * Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension.
     */
    function getViews(fetchProperties?: {
        /**
         * The type of view to get. If omitted, returns all views (including background pages and tabs). Valid values: 'tab', 'popup', 'sidebar'.
         */
        type?: ViewType;
        /**
         * The window to restrict the search to. If omitted, returns all views.
         */
        windowId?: number;
        /**
         * Find a view according to a tab id. If this field is omitted, returns all views.
         */
        tabId?: number;
    }): [];
    /**
     * Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.
     */
    function getBackgroundPage(): object;
    /**
     * Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.
     */
    function isAllowedIncognitoAccess(): Promise<boolean>;
    /**
     * Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.
     */
    function isAllowedFileSchemeAccess(): Promise<boolean>;
    /**
     * Sets the value of the ap CGI parameter used in the extension's update URL.  This value is ignored for extensions that are hosted in the browser vendor's store.
     */
    function setUpdateUrlData(data: string): void;
    const /* 1 of 2 */ onRequest: EventHandler<
            /**
             * Fired when a request is sent from either an extension process or a content script.
             */
            | ((
                  /**
                   * The request sent by the calling script.
                   */

                  request: any,
                  sender: /* lookup type? "runtime.MessageSender" */ runtime.MessageSender,
                  /**
                   * Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object, or undefined if there is no response. If you have more than one `onRequest` listener in the same document, then only one may send a response.
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              void)
            | ((
                  sender: /* lookup type? "runtime.MessageSender" */ runtime.MessageSender,
                  /**
                   * Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object, or undefined if there is no response. If you have more than one `onRequest` listener in the same document, then only one may send a response.
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              void)
        >;
    const /* 2 of 2 */ onRequestExternal: EventHandler<
            /**
             * Fired when a request is sent from another extension.
             */
            | ((
                  /**
                   * The request sent by the calling script.
                   */

                  request: any,
                  sender: /* lookup type? "runtime.MessageSender" */ runtime.MessageSender,
                  /**
                   * Function to call when you have a response. The argument should be any JSON-ifiable object, or undefined if there is no response.
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              void)
            | ((
                  sender: /* lookup type? "runtime.MessageSender" */ runtime.MessageSender,
                  /**
                   * Function to call when you have a response. The argument should be any JSON-ifiable object, or undefined if there is no response.
                   */ sendResponse: /* or any?  */ () => void
              ) => /* x7 */
              void)
        >;
    /**
     * Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be <var>undefined</var>.
     */
    const lastError = undefined;
    /**
     * True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior.
     */
    const inIncognitoContext = undefined;
}

/**
 * Use the `browser.storage` API to store, retrieve, and track changes to user data.
 */
declare namespace browser.storage {
    interface StorageChange {
        /**
         * The old value of the item, if there was an old value.
         */
        oldValue?: any;
        /**
         * The new value of the item, if there is a new value.
         */
        newValue?: any;
    }

    interface StorageArea {
        /**
         * Gets one or more items from storage.
         */

        get(
            /**
             * A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object).  An empty list or object will return an empty result object.  Pass in `null` to get the entire contents of storage.
             */ keys?: string | string[] | /* "unknown" undefined */ object
        ): Promise</* "unknown" undefined */ object>;

        /**
         * Gets the amount of space (in bytes) being used by one or more items.
         */

        getBytesInUse(
            /**
             * A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
             */ keys?: string | string[]
        ): Promise<number>;

        /**
         * Sets multiple items.
         */

        set(
            /**
             * <p>An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.</p><p>Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).</p>
             */ items: /* "unknown" undefined */ object
        ): Promise<void>;

        /**
         * Removes one or more items from storage.
         */

        remove(
            /**
             * A single key or a list of keys for items to remove.
             */ keys: string | string[]
        ): Promise<void>;

        /**
         * Removes all items from storage.
         */

        clear(): Promise<void>;
    }

    interface StorageAreaSync {
        /**
         * Gets one or more items from storage.
         */

        get(
            /**
             * A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object).  An empty list or object will return an empty result object.  Pass in `null` to get the entire contents of storage.
             */ keys?: string | string[] | /* "unknown" undefined */ object
        ): Promise</* "unknown" undefined */ object>;

        /**
         * Gets the amount of space (in bytes) being used by one or more items.
         */

        getBytesInUse(
            /**
             * A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
             */ keys?: string | string[]
        ): Promise<number>;

        /**
         * Sets multiple items.
         */

        set(
            /**
             * <p>An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.</p><p>Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).</p>
             */ items: /* "unknown" undefined */ object
        ): Promise<void>;

        /**
         * Removes one or more items from storage.
         */

        remove(
            /**
             * A single key or a list of keys for items to remove.
             */ keys: string | string[]
        ): Promise<void>;

        /**
         * Removes all items from storage.
         */

        clear(): Promise<void>;
    }

    const /* 1 of 1 */ onChanged: EventHandler</**
         * Fired when one or more items change.
         */
        (
            /**
             * Object mapping each key that changed to its corresponding $(ref:storage.StorageChange) for that item.
             */

            changes: /* "unknown" undefined */ object,
            /**
             * The name of the storage area (`"sync"`, `"local"` or `"managed"`) the changes are for.
             */ areaName: string
        ) => void>;
    /**
     * Items in the `sync` storage area are synced by the browser.
     */
    const sync: StorageAreaSync;
    /**
     * Items in the `local` storage area are local to each machine.
     */
    const local: StorageArea;
    /**
     * Items in the `managed` storage area are set by administrators or native applications, and are read-only for the extension; trying to modify this namespace results in an error.
     */
    const managed: StorageArea;
}

/**
 * Use the `browser.webRequest` API to observe and analyze traffic and to intercept, block, or modify requests in-flight.
 */
declare namespace browser.webRequest {
    type ResourceType = string;
    type OnBeforeRequestOptions = string;
    type OnBeforeSendHeadersOptions = string;
    type OnSendHeadersOptions = string;
    type OnHeadersReceivedOptions = string;
    type OnAuthRequiredOptions = string;
    type OnResponseStartedOptions = string;
    type OnBeforeRedirectOptions = string;
    type OnCompletedOptions = string;
    /**
     * An object describing filters to apply to webRequest events.
     */
    interface RequestFilter {
        /**
         * A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out.
         */
        urls: string[];
        /**
         * A list of request types. Requests that cannot match any of the types will be filtered out.
         */
        types?: ResourceType[];
        tabId?: number;
        windowId?: number;
        /**
         * If provided, requests that do not match the incognito state will be filtered out.
         */
        incognito?: boolean;
    }

    /**
     * An array of HTTP headers. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`.
     */
    /* skipped: HttpHeaders: array */
    type HttpHeaders = {
        /**
         * Name of the HTTP header.
         */
        name: string;
        /**
         * Value of the HTTP header if it can be represented by UTF-8.
         */
        value?: string;
        /**
         * Value of the HTTP header if it cannot be represented by UTF-8, stored as individual byte values (0..255).
         */
        binaryValue?: number[];
    }[];
    /**
     * Returns value for event handlers that have the 'blocking' extraInfoSpec applied. Allows the event handler to modify network requests.
     */
    interface BlockingResponse {
        /**
         * If true, the request is cancelled. Used in onBeforeRequest, this prevents the request from being sent.
         */
        cancel?: boolean;
        /**
         * Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as data: are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method.
         */
        redirectUrl?: string;
        /**
         * Only used as a response to the onBeforeRequest event. If set, the original request is prevented from being sent/completed and is instead upgraded to a secure request.  If any extension returns `redirectUrl` during onBeforeRequest, `upgradeToSecure` will have no affect.
         */
        upgradeToSecure?: boolean;
        /**
         * Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.
         */
        requestHeaders?: HttpHeaders;
        /**
         * Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return `responseHeaders` if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify `responseHeaders` for each request).
         */
        responseHeaders?: HttpHeaders;
        /**
         * Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.
         */
        authCredentials?: {
            username: string;
            password: string;
        };
    }

    /**
     * Contains the certificate properties of the request if it is a secure request.
     */
    interface CertificateInfo {
        subject: string;
        issuer: string;
        /**
         * Contains start and end timestamps.
         */
        validity: {
            start: number;
            end: number;
        };
        fingerprint: {
            sha1: string;
            sha256: string;
        };
        serialNumber: string;
        isBuiltInRoot: boolean;
        subjectPublicKeyInfoDigest: {
            sha256: string;
        };
        rawDER?: number[];
    }

    type CertificateTransparencyStatus = string;
    type TransportWeaknessReasons = string;
    /**
     * Contains the security properties of the request (ie. SSL/TLS information).
     */
    interface SecurityInfo {
        state: 'insecure' | 'weak' | 'broken' | 'secure';
        /**
         * Error message if state is "broken"
         */
        errorMessage?: string;
        /**
         * Protocol version if state is "secure"
         */
        protocolVersion?:
            | 'TLSv1'
            | 'TLSv1.1'
            | 'TLSv1.2'
            | 'TLSv1.3'
            | 'unknown';
        /**
         * The cipher suite used in this request if state is "secure".
         */
        cipherSuite?: string;
        /**
         * The key exchange algorithm used in this request if state is "secure".
         */
        keaGroupName?: string;
        /**
         * The signature scheme used in this request if state is "secure".
         */
        signatureSchemeName?: string;
        /**
         * Certificate data if state is "secure".  Will only contain one entry unless `certificateChain` is passed as an option.
         */
        certificates: CertificateInfo[];
        /**
         * The domain name does not match the certificate domain.
         */
        isDomainMismatch?: boolean;
        isExtendedValidation?: boolean;
        /**
         * The certificate is either expired or is not yet valid.  See `CertificateInfo.validity` for start and end dates.
         */
        isNotValidAtThisTime?: boolean;
        isUntrusted?: boolean;
        /**
         * Certificate transparency compliance per RFC 6962.  See `https://www.certificate-transparency.org/what-is-ct` for more information.
         */
        certificateTransparencyStatus?: CertificateTransparencyStatus;
        /**
         * True if host uses Strict Transport Security and state is "secure".
         */
        hsts?: boolean;
        /**
         * True if host uses Public Key Pinning and state is "secure".
         */
        hpkp?: string;
        /**
         * list of reasons that cause the request to be considered weak, if state is "weak"
         */
        weaknessReasons?: TransportWeaknessReasons[];
    }

    /**
     * Contains data uploaded in a URL request.
     */
    interface UploadData {
        /**
         * An ArrayBuffer with a copy of the data.
         */
        bytes?: any;
        /**
         * A string with the file's path and name.
         */
        file?: string;
    }

    /**
     * Tracking flags that match our internal tracking classification
     */
    /**
     * Tracking flags that match our internal tracking classification
     */
    type UrlClassificationFlags = string;
    /**
     * If the request has been classified this is an array of $(ref:UrlClassificationFlags).
     */
    /* skipped: UrlClassificationParty: array */
    type UrlClassificationParty = UrlClassificationFlags[];
    interface UrlClassification {
        /**
         * Classification flags if the request has been classified and it is first party.
         */
        firstParty: UrlClassificationParty;
        /**
         * Classification flags if the request has been classified and it or its window hierarchy is third party.
         */
        thirdParty: UrlClassificationParty;
    }

    /**
     * Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.
     */
    function handlerBehaviorChanged(): Promise<void>;
    /**
     * ...
     */
    function filterResponseData(requestId: string): object;
    /**
     * Retrieves the security information for the request.  Returns a promise that will resolve to a SecurityInfo object.
     */
    function getSecurityInfo(
        requestId: string,
        options?: {
            /**
             * Include the entire certificate chain.
             */
            certificateChain?: boolean;
            /**
             * Include raw certificate data for processing by the extension.
             */
            rawDER?: boolean;
        }
    ): Promise<any>;
    const /* 1 of 9 */ onBeforeRequest: EventHandler</**
         * Fired when a request is about to occur.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'.
             */
            requestBody?: {
                /**
                 * Errors when obtaining request body data.
                 */
                error?: string;
                /**
                 * If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': ['value1', 'value2']}.
                 */
                formData?: {};
                /**
                 * If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array.
                 */
                raw?: UploadData[];
            };
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => undefined>;
    const /* 2 of 9 */ onBeforeSendHeaders: EventHandler</**
         * Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The HTTP request headers that are going to be sent out with this request.
             */
            requestHeaders?: HttpHeaders;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => undefined>;
    const /* 3 of 9 */ onSendHeaders: EventHandler</**
         * Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired).
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The HTTP request headers that have been sent out with this request.
             */
            requestHeaders?: HttpHeaders;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => void>;
    const /* 4 of 9 */ onHeadersReceived: EventHandler</**
         * Fired when HTTP response headers of a request have been received.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line).
             */
            statusLine: string;
            /**
             * The HTTP response headers that have been received with this response.
             */
            responseHeaders?: HttpHeaders;
            /**
             * Standard HTTP status code returned by the server.
             */
            statusCode: number;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => undefined>;
    const /* 5 of 9 */ onAuthRequired: EventHandler</**
         * Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The authentication scheme, e.g. Basic or Digest.
             */
            scheme: string;
            /**
             * The authentication realm provided by the server, if there is one.
             */
            realm?: string;
            /**
             * The server requesting authentication.
             */
            challenger: {
                host: string;
                port: number;
            };
            /**
             * True for Proxy-Authenticate, false for WWW-Authenticate.
             */
            isProxy: boolean;
            /**
             * The HTTP response headers that were received along with this response.
             */
            responseHeaders?: HttpHeaders;
            /**
             * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
             */
            statusLine: string;
            /**
             * Standard HTTP status code returned by the server.
             */
            statusCode: number;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => undefined>;
    const /* 6 of 9 */ onResponseStarted: EventHandler</**
         * Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
             */
            ip?: string;
            /**
             * Indicates if this response was fetched from disk cache.
             */
            fromCache: boolean;
            /**
             * Standard HTTP status code returned by the server.
             */
            statusCode: number;
            /**
             * The HTTP response headers that were received along with this response.
             */
            responseHeaders?: HttpHeaders;
            /**
             * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
             */
            statusLine: string;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => void>;
    const /* 7 of 9 */ onBeforeRedirect: EventHandler</**
         * Fired when a server-initiated redirect is about to occur.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
             */
            ip?: string;
            /**
             * Indicates if this response was fetched from disk cache.
             */
            fromCache: boolean;
            /**
             * Standard HTTP status code returned by the server.
             */
            statusCode: number;
            /**
             * The new URL.
             */
            redirectUrl: string;
            /**
             * The HTTP response headers that were received along with this redirect.
             */
            responseHeaders?: HttpHeaders;
            /**
             * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
             */
            statusLine: string;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => void>;
    const /* 8 of 9 */ onCompleted: EventHandler</**
         * Fired when a request is completed.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
             */
            ip?: string;
            /**
             * Indicates if this response was fetched from disk cache.
             */
            fromCache: boolean;
            /**
             * Standard HTTP status code returned by the server.
             */
            statusCode: number;
            /**
             * The HTTP response headers that were received along with this response.
             */
            responseHeaders?: HttpHeaders;
            /**
             * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
             */
            statusLine: string;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
            /**
             * For http requests, the bytes transferred in the request. Only available in onCompleted.
             */
            requestSize: number;
            /**
             * For http requests, the bytes received in the request. Only available in onCompleted.
             */
            responseSize: number;
        }) => void>;
    const /* 9 of 9 */ onErrorOccurred: EventHandler</**
         * Fired when an error occurs.
         */
        (details: {
            /**
             * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
             */
            requestId: string;
            url: string;
            /**
             * Standard HTTP method.
             */
            method: string;
            /**
             * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
             */
            frameId: number;
            /**
             * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
             */
            parentFrameId: number;
            /**
             * True for private browsing requests.
             */
            incognito?: boolean;
            /**
             * The cookie store ID of the contextual identity.
             */
            cookieStoreId?: string;
            /**
             * URL of the resource that triggered this request.
             */
            originUrl?: string;
            /**
             * URL of the page into which the requested resource will be loaded.
             */
            documentUrl?: string;
            /**
             * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
             */
            tabId: number;
            /**
             * How the requested resource will be used.
             */
            type: ResourceType;
            /**
             * The time when this signal is triggered, in milliseconds since the epoch.
             */
            timeStamp: number;
            /**
             * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
             */
            ip?: string;
            /**
             * Indicates if this response was fetched from disk cache.
             */
            fromCache: boolean;
            /**
             * The error description. This string is *not* guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content.
             */
            error: string;
            /**
             * Tracking classification if the request has been classified.
             */
            urlClassification?: UrlClassification;
            /**
             * Indicates if this request and its content window hierarchy is third party.
             */
            thirdParty: boolean;
        }) => void>;
    /**
     * The maximum number of times that `handlerBehaviorChanged` can be called per 10 minute sustained interval. `handlerBehaviorChanged` is an expensive function call that shouldn't be called often.
     */
    const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES = 20;
}

/**
 * This API provides the ability detect the captive portal state of the users connection.
 */
declare namespace browser.captivePortal {
    /**
     * Returns the current portal state, one of `unknown`, `not_captive`, `unlocked_portal`, `locked_portal`.
     */
    function getState(): Promise<any>;
    /**
     * Returns the time difference between NOW and the last time a request was completed in milliseconds.
     */
    function getLastChecked(): Promise<any>;
    const /* 1 of 2 */ onStateChanged: EventHandler</**
         * Fired when the captive portal state changes.
         */
        (details: {
            /**
             * The current captive portal state.
             */
            state:
                | 'unknown'
                | 'not_captive'
                | 'unlocked_portal'
                | 'locked_portal';
        }) => void>;
    const /* 2 of 2 */ onConnectivityAvailable: EventHandler</**
         * This notification will be emitted when the captive portal service has determined that we can connect to the internet. The service will pass either `captive` if there is an unlocked captive portal present, or `clear` if no captive portal was detected.
         */
        (status: 'captive' | 'clear') => void>;
    /**
     * Return the canonical captive-portal detection URL. Read-only.
     */
    const canonicalURL: /* lookup type? "types.Setting" */ types.Setting;
}
