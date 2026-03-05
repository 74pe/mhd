
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    /**
     * Функция проверяет, является ли переданный объект инстансом переданного класса.
     * @param object - объект.
     * @param someClass - класс.
     * @returns true, если объект является инстансом переданного класса, иначе - false.
     * @remarks
     * Также проверяет, является ли родительский элемент объекта инстансом переданного класса.
     *
     * Функция работает корректно для встроенных классов JavaScript (например, `HTMLVideoElement`).
     * Для скомпилированных классов может возвращать неверные результаты, так как проверка основывается
     * на прототипе `[object Object]`, который может совпадать для разных объектов.
     */
    // eslint-disable-next-line @stylistic/max-len
    const instanceOf = (object, someClass) => {
        if (object) {
            const targetProtoString = Object.prototype.toString.call(someClass.prototype);
            let proto = Object.getPrototypeOf(object);
            while (proto) {
                if (Object.prototype.toString.call(proto) === targetProtoString) {
                    return true;
                }
                proto = Object.getPrototypeOf(proto);
            }
        }
        return false;
    };

    /**
     * Функция проверяет, является ли переданный парамент числом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является числом, иначе - false.
     */
    const number = (something) => typeof something === "number" && !isNaN(something) && isFinite(something);
    /**
     * Функция проверяет, является ли переданный параметр строкой.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является строкой, иначе - false.
     */
    const string = (something) => typeof something === "string" || instanceOf(something, String);
    /**
     * Функция проверяет, является ли переданный параметр объектом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является объектом, иначе - false.
     */
    const object = (something) => (typeof something === "object"
        && !Array.isArray(something)
        && something !== null);
    /**
     * Функция проверяет, является ли переданный параметр строго объектом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является строго объектом, иначе - false.
     * @remarks
     * Под проверкой на строгий объект подрузамевается, что объект создан с только с помощью {} или new Object().
     */
    const strictObject = (something) => Object.prototype.toString.call(something) === "[object Object]";
    /**
     * Функция проверяет, является ли переданный элемент инстансом класса HTMLElement или Document.
     * @param htmlObj - элемент, который необходимо проверить.
     * @returns true, если переданный элемент является инстансом класса HTMLElement или Document, иначе - false.
     */
    const htmlElement = (htmlObj) => instanceOf(htmlObj, HTMLElement) || htmlDocumentElement(htmlObj);
    /**
     * Функция проверяет, является ли переданный элемент инстансом класса Document.
     * @param doc - элемент, который необходимо проверить.
     * @returns true, если переданный элемент является инстансом класса Document.
     */
    const htmlDocumentElement = (doc) => instanceOf(doc, Document);

    /* eslint-disable @typescript-eslint/naming-convention */
    /**
     * Проверяет, работает ли устройство, на котором запущено приложение, на операционной системе IOS.(iPhone, iPod или iPad).
     * Если в функцию не передан UA, то userAgent возьмется из ближайшего window.
     * @param UA - userAgent пользователя.
     * @returns true, если устройство, на котором запущено приложение, работает на операционной системе IOS, иначе false.
     */
    const IOS = (UA) => {
        const ua = (string(UA) ? UA : window.navigator.userAgent).toLowerCase();
        return /iphone|ipod|ipad/.test(ua);
    };

    /**
     * Функция предназначена для получения случайного числа заданного порядка (По умолчанию 10).
     * @param len - порядок числа.
     * @returns случайное число заданного порядка.
     */
    const getRandomNumber = (len) => {
        const initialNumber = +`1E${len}`;
        const min = (initialNumber / 10);
        return Math.floor(min + Math.random() * (initialNumber - min));
    };

    /**
     * Функция предназначена для получения случайной строки заданной длины.
     * @param len - длина строки.
     * @returns случайную строку заданной длины.
     */
    const getRandomString = (len) => {
        const chrs = "abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789";
        const str = new Array(len);
        for (let i = 0; i < len; i++) {
            const pos = Math.floor(Math.random() * chrs.length);
            str[i] = chrs.substring(pos, pos + 1);
        }
        if (!isNaN(+str[0])) {
            str[0] = "x";
        }
        return str.join("");
    };

    /**
     * Принимает строку и возвращает новую строку, в которой удалены все пробельные символы.
     * @param str - cтрока, из которой удаляются пробельные символы.
     * @returns новую строку, в которой удалены все пробельные символы.
     */
    const removeSpacesFromString = (str) => {
        if (!string(str)) {
            throw new Error(`${str} is not a string`);
        }
        return str.replace(/\s/g, "");
    };

    /**
     * Функция ожидания загрузки страницы.
     *
     * @param doc - документ, в контексте которого выполняется проверка.
     * По умолчанию используется глобальный объект `window.document`.
     *
     * @returns Промис, который разрешается после загрузки страницы.
     */
    const waitForPageLoad = (doc = window.document) => new Promise((resolve) => {
        if (doc.readyState === "loading") {
            doc.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
        }
        else {
            resolve();
        }
    });

    /**
     * Проверяет, является ли переданная строка пустой, если удалить из неё все пробельные символы.
     * @param str - строка, который необходимо проверить.
     * @returns true, если переданная строка является пустой, иначе false.
     */
    const isEmptyString = (str) => {
        if (!string(str)) {
            throw new Error(`${str} is not a string`);
        }
        return removeSpacesFromString(str).length === 0;
    };

    /**
     * Устанавливает свойства элемента с помощью функции установки свойств.
     * @param element - элемент, для которого устанавливаются свойства.
     * @param properties - свойства для установки.
     * @param propertySetter - функция установки свойства.
     */
    const setProperties = (element, properties, propertySetter) => {
        if ((!htmlElement(element) && !(element instanceof SVGElement)) || !strictObject(properties)) {
            return;
        }
        for (const property in properties) {
            const value = number(properties[property]) ? String(properties[property]) : properties[property];
            propertySetter(element, property, value);
        }
    };
    /**
     * Устанавливает стили для элемента.
     * @param element - элемент, для которого устанавливаются стили.
     * @param styles - устанавливаемые стили.
     */
    const setStyles = (element, styles) => setProperties(element, styles, (el, prop, val) => el.style.setProperty(prop, val));
    /**
     * Устанавливает атрибуты для элемента.
     * @param element - элемент, для которого устанавливаются атрибуты.
     * @param attributes - устанавливаемые атрибуты.
     */
    const setAttributes = (element, attributes) => setProperties(element, attributes, (el, prop, val) => el.setAttribute(prop, val));

    /**
     * Класс URI расширяет класс URL и добавляет дополнительные функции.
     */
    class URI extends URL {
        /**
         * Массив объектов MacrosData, каждый из которых содержит значение и шаблон RegExp.
         */
        macrosList = [];
        /**
         * Проверяет, имеет ли данная строка протокол http или https.
         * @param str - строка для проверки протокола.
         * @returns true, если строка имеет протокол http или https, иначе false.
         */
        static hasProtocol(str) {
            return /^(https|http):\/\/.+/.test(str);
        }
        /**
         * @param str - cтрока URL. Если протокол не указан, автоматически добавляется «https:».
         */
        constructor(str) {
            const url = URI.hasProtocol(str) ? str : "https:" + str;
            super(url);
            // safari в iOS 13 и меньше, игнорирует наследование некоторых классов, если посмотреть прототип,
            // то там будут добавлены методы, но у экземпляра этого класса, будут методы только класса от которого наследуемся.
            // чтобы обойти это, явно устанавливаем прототип
            Object.setPrototypeOf(this, URI.prototype);
        }
        /**
         * Задает макрос, который можно заменить в строке URL.
         * @param macros - имя макроса.
         * @param value - значение для замены макроса.
         * @returns this.
         */
        setMacros(macros, value) {
            value = value.toString();
            macros = macros.replace(/[^a-zA-Z0-9 ]/g, "");
            const template = new RegExp(`\\!\\[${macros}\\]`);
            this.macrosList.push({ value, template });
            return this;
        }
        /**
         * Устанавливает макрос "rnd" со случайным числовым значением.
         * @returns this.
         */
        setRnd() {
            this.setMacros("rnd", getRandomNumber(6));
            return this;
        }
        /**
         * Задает параметры запроса в URL.
         * @param params - объект, в котором каждая пара ключ-значение представляет параметр запроса и его значение.
         * @returns this.
         */
        setParams(params) {
            for (const param in params) {
                const value = params[param];
                if (strictObject(value)) {
                    this.setParams(value);
                }
                else {
                    this.searchParams.set(param, value.toString());
                }
            }
            return this;
        }
        /**
         * Заменяет макросы в строке.
         * @param str - строка для замены макросов.
         * @returns строка с заменёнными макросами.
         */
        replaceMacros(str) {
            return this.macrosList.reduce((result, { value, template }) => result.replace(template, value), str);
        }
        /**
         * Возвращает строку URL.
         * @returns строку URL.
         */
        toString() {
            const url = new URL(super.toString());
            // заменяем макросы в пути урла(pathname)
            // его декодировать не нужно, так как это путь, а не параметр
            url.pathname = this.replaceMacros(url.pathname);
            // Декодируем не весь URL целиком, а отдельно значения каждого параметра.
            // Полный decode всей строки может сломать URL: если внутри `loc` есть вложенный query,
            // то раскодированные `&` и ключи (например, `pid`) станут внешними
            // и фактически получим второй параметр `pid` тем самым перезапишем исходный.
            // смотри https://jira.projects.x/browse/JS-2148
            const updatedParams = new URLSearchParams();
            const entries = Array.from(url.searchParams.entries());
            for (const [key, originalValue] of entries) {
                let valueForReplace = originalValue;
                // Попытка декодировать параметр, чтобы обработать макросы в читаемой форме.
                // Если в строке параметра присутствует некорректный символ (например, неподдерживаемая последовательность %),
                // decodeURIComponent выбросит ошибку "malformed URI". В этом случае используется исходный параметр.
                // смотри https://jira.projects.x/browse/JS-1450
                try {
                    valueForReplace = decodeURIComponent(originalValue);
                }
                catch {
                    valueForReplace = originalValue;
                }
                updatedParams.append(key, this.replaceMacros(valueForReplace));
            }
            // URLSearchParams кодирует значения
            url.search = updatedParams.toString();
            return url.toString();
        }
        /**
         * Гарантирует, что URL использует https протокол.
         * @returns this.
         */
        httpslize() {
            if (this.protocol !== "https:") {
                this.protocol = "https:";
            }
            return this;
        }
        /**
         * Создает и возвращает новый экземпляр {@link URI}, основанный на текущем объекте {@link URI}.
         *
         * @return новый экземпляр {@link URI}.
         */
        copy() {
            const copy = new URI(URL.prototype.toString.call(this));
            copy.macrosList.push(...this.macrosList);
            return copy;
        }
    }

    /**
     * Коды ошибок Etag (03.XXX).
     * @knipignore
     */
    var EtagErrors;
    (function (EtagErrors) {
        /**
         * Неверный eCid: значение eCid в ответе фрейма не является строкой или является пустой строкой.
         */
        EtagErrors["InvalidEcid"] = "03.001";
        /**
         * Ошибка тайм-аута: значение eCid в ответе фрейма не было получено в течение заданного времени.
         */
        EtagErrors["TimeOutError"] = "03.002";
    })(EtagErrors || (EtagErrors = {}));

    /**
     * Коды ошибок модуля Utilities (00.XXX).
     * @knipignore
     */
    var UtilitiesErrors;
    (function (UtilitiesErrors) {
        /**
         * Ошибка загрузки пикселя. Изображение не удалось загрузить.
         */
        UtilitiesErrors["PixelLoadError"] = "00.001";
        /**
         * Пустой URL для отправки пикселя. Передана пустая строка в качестве URL.
         */
        UtilitiesErrors["EmptyUrl"] = "00.002";
        /**
         * Некорректный тип URL. Передано значение не в формате строки (число, объект).
         */
        UtilitiesErrors["InvalidUrlType"] = "00.003";
        /**
         * Превышено время ожидания отправки пикселя. Запрос не завершился в течение заданного времени (10 секунд).
         */
        UtilitiesErrors["TimeOutError"] = "00.004";
    })(UtilitiesErrors || (UtilitiesErrors = {}));

    /**
     * Класс для обработки ошибок в продуктах Adriver.
     */
    class AdriverError extends Error {
        /**
         * TODO: Добавить ссылку на таблицу ошибок в confluence.
         * @param errorCode - код ошибки.
         * @param options - объект дополнительных свойств ошибки.
         */
        constructor(errorCode, options) {
            super(errorCode, { cause: options?.cause });
            this.name = "AdriverError";
        }
    }

    /**
     * Время ожидания запроса.
     */
    const TIMEOUT$1 = 10000;

    const imgStyles = {
        position: "absolute",
        display: "none",
        width: "0px",
        height: "0px"
    };
    /**
     * Предназначен для отправки запросов посредством вставки элемента img в DOM (пискелей).
     */
    class Pigeon {
        /**
         * URL по которому необходимо отправить запрос.
         */
        url;
        /**
         * Элемент, в который будет вставлен img. По умолчанию - document.body.
         */
        element;
        /**
         * @param url - URL по которому необходимо отправить запрос.
         * @param element - элемент, в который будет вставлен img. По умолчанию - document.body.
         */
        constructor(url, element) {
            if (string(url) && isEmptyString(url)) {
                throw new AdriverError(UtilitiesErrors.EmptyUrl);
            }
            if (!string(url)) {
                throw new AdriverError(UtilitiesErrors.InvalidUrlType);
            }
            this.url = url;
            if (element instanceof Document) {
                this.element = element.body;
            }
            else if (element instanceof HTMLElement) {
                this.element = element;
            }
            else {
                this.element = document.body;
            }
        }
        /**
         * Отправляет запрос. Реджектит промис, если запрос превышает время ожидания (10с).
         * @returns промис.
         */
        send() {
            return new Promise((resolve, reject) => {
                const img = document.createElement("img");
                setStyles(img, imgStyles);
                img.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
                img.setAttribute("src", this.url);
                img.setAttribute("alt", "");
                const timeOutHandler = setTimeout(() => {
                    img.removeEventListener("load", imgEventHandler);
                    img.removeEventListener("error", imgEventHandler);
                    reject(new AdriverError(UtilitiesErrors.TimeOutError));
                }, TIMEOUT$1);
                const imgEventHandler = (event) => {
                    clearTimeout(timeOutHandler);
                    if (event.type === "error") {
                        reject(new AdriverError(UtilitiesErrors.PixelLoadError));
                    }
                    else {
                        resolve(event);
                    }
                };
                img.addEventListener("load", imgEventHandler);
                img.addEventListener("error", imgEventHandler);
                this.element.append(img);
            });
        }
    }

    var LocationTypes;
    (function (LocationTypes) {
        LocationTypes["OnPage"] = "onpage";
        LocationTypes["SameDomainFrame"] = "samedomainiframe";
        LocationTypes["CrossDomainFrame"] = "crossdomainframe";
    })(LocationTypes || (LocationTypes = {}));
    /**
     * Максимальное количество итераций при поиске последнего доступного окна.
     * Ограничивает количество проходов по цепочке родительских окон для предотвращения бесконечных циклов.
     */
    const MAX_ITERATIONS = 20;

    /**
     * Находит первый валидный (не `"about:blank"`) урл из цепочки окон.
     *
     * Полезно в ситуациях, когда скрипт запускается внутри iframe без установленного `src`,
     * и необходимо определить урл окна.
     *
     * @see https://jira.projects.x/browse/JS-1867
     *
     * @param win - окно, в котором начинается поиск (по умолчанию текущее `window`).
     *
     * @returns Первый валидный урл в иерархии окон.
     */
    const getFirstValidUrl = (win = window) => {
        const { href } = win.location;
        if (href === "about:blank") {
            return getFirstValidUrl(win.parent);
        }
        return href;
    };

    /**
     * Анализирует иерархию окон (фреймов) и собирает информацию о доступных окнах.
     * Метод проходит по цепочке родительских окон до тех пор, пока не найдет кроссдоменное окно
     * или не достигнет верхнего окна (window.top).
     *
     * @returns Объект, содержащий:
     * - lastAccessibleWindow: последнее полностью доступное окно в иерархии
     * - highestReachableWindow: наивысшее достижимое окно (либо window.top, либо недоступное кроссдоменное окно)
     */
    const getWindowsHierarchyInfo = () => {
        let currentWindow = window;
        let lastAccessibleWindow = window;
        let highestReachableWindow = window;
        let iterations = 0;
        while (currentWindow !== window.top && iterations < MAX_ITERATIONS) {
            const nextWindow = currentWindow.parent;
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                nextWindow.location.href;
                lastAccessibleWindow = nextWindow;
                currentWindow = nextWindow;
                highestReachableWindow = currentWindow;
            }
            catch (e) {
                highestReachableWindow = nextWindow; // устанавливаем предположительное топ окно которое упало в кроссдоменном фрейме
                // кроссдоменный фрейм, останавливаемся
                break;
            }
            iterations++;
        }
        return {
            lastAccessibleWindow,
            highestReachableWindow
        };
    };

    /**
     * Проверяет, содержит ли переданный URL какие-либо дополнительные детали:
     * - путь, отличный от `/`
     * - параметры запроса
     * - хэш
     *
     * @param url - строка `URL` для проверки.
     * @returns `true`, если `URL` содержит хотя бы одну из вышеуказанных деталей, иначе `false`.
     *
     * @example
     * hasUrlDetails("https://example.com/page?test=1#hash") // true
     * hasUrlDetails("https://example.com/page") // true
     * hasUrlDetails("https://example.com?foo=1") // true (search)
     * hasUrlDetails("https://example.com#section") // true (hash)
     * hasUrlDetails("https://example.com/") // false
     * hasUrlDetails("") // false (некорректный URL)
     */
    const hasUrlDetails = (url) => {
        try {
            const { hash, search, pathname } = new URI(url);
            return Boolean(hash || search || (pathname && pathname !== "/"));
        }
        catch {
            return false;
        }
    };

    /* eslint-disable jsdoc/check-indentation */
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    /**
     * Представляет собой синглтон, который определяет информацию о текущей локации скрипта
     */
    class MyLocation {
        /**
         * Инстанс класса.
         */
        static _instance;
        /**
         * Локация скрипта.
         */
        _location;
        /**
         * Самый верхний window.
         */
        _topWin;
        /**
         * Самый верхний href.
         */
        _topRef;
        /**
         * Урл текущего окна или первого родительского окна с валидным урлом (не `"about:blank"`).
         */
        _currentReferrer;
        /**
         * Флаг, указывающий, соответствует ли значение {@link topReferrer} фактическому `URL` исходной страницы.
         */
        _isTopRefAccurate;
        /**
         * Флаг, указывающий является ли {@link topReferrer} полным `URL` исходной страницы.
         *
         * Под "полным URL" подразумевается наличие не только `origin`, но и дополнительных компонентов URL:
         * `pathname`, `search` или `hash`.
         *
         * Возможные значения:
         * - `1` - если доступен полный `URL` исходной страницы.
         * - `0` - если доступен только `origin` исходной страницы.
         * - `-1` - если не доступен `URL` исходной страницы.
         */
        _isFullTopRefAvailable;
        constructor() {
            if (MyLocation._instance) {
                return MyLocation._instance;
            }
            MyLocation._instance = this;
            this.analyzeLocation();
        }
        /**
         * Определяет все свойства класса.
         */
        analyzeLocation() {
            // определяем тип локации и верхнее окно
            this.setLocationAndTopWindow();
            // определяем URL верхнего окна и его точность
            this.setTopRefAndAccuracy();
            // определяем урл текущего окна или первого родителя с валидным урлом
            this._currentReferrer = getFirstValidUrl();
        }
        /**
         * Определяет, где выполняется скрипт и сохраняет ссылку на самое верхнее window.
         */
        setLocationAndTopWindow() {
            if (window.top === window) {
                // такая запись для того чтобы инитить readonly свойства в методе, а не в конструкторе
                this._location = LocationTypes.OnPage;
                this._topWin = window;
                return;
            }
            this._topWin = window.top;
            try {
                window.top?.location.href; // если в кроссдоменном фрейме выбросится ошибка
                this._location = LocationTypes.SameDomainFrame;
            }
            catch (_) {
                this._location = LocationTypes.CrossDomainFrame;
            }
        }
        /**
         * Определяет значение самого верхнего href и устанавливает флаг, насколько этот URL достоверен.
         */
        setTopRefAndAccuracy() {
            // если мы на странице или в same-domain фрейме, можем получить полный URL напрямую
            if (this._location === LocationTypes.OnPage || this._location === LocationTypes.SameDomainFrame) {
                this._topRef = this._topWin.location.href;
                this._isTopRefAccurate = true;
                this._isFullTopRefAvailable = 1;
                return;
            }
            // в cross-domain используем getWindowsHierarchyInfo,
            // для получения последнего доступного окна и проверки, достигли ли мы действительно верхнего окна.
            const { lastAccessibleWindow, highestReachableWindow } = getWindowsHierarchyInfo();
            const topAncestorOrigin = ("ancestorOrigins" in window.location) ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1] : undefined;
            const referrer = lastAccessibleWindow.document.referrer;
            const href = lastAccessibleWindow.location.href;
            // 1. Если самый верхний доступный `window` — это `window.top`, и `referrer` доступен
            //
            // Примечания:
            // - `referrer` - содержит `URL` исходной страницы.
            //
            // - `referrer` содержит полный `URL` если на странице установлен один из этих тегов:
            //    - `<meta name="referrer" content="no-referrer-when-downgrade">`,
            //    - `<meta name="referrer" content="unsafe-url">`,
            //
            // - `referrer` может быть недоступен, если:
            //    - Установлен `<meta name="referrer" content="no-referrer">`.
            //    - Переход был с HTTPS на HTTP (по умолчанию действует политика `no-referrer-when-downgrade`).
            if (highestReachableWindow === this._topWin && referrer) {
                this._topRef = referrer;
                this._isTopRefAccurate = true;
                this._isFullTopRefAvailable = hasUrlDetails(referrer) ? 1 : 0;
                return;
            }
            // 2. Если доступен `ancestorOrigins` и при этом не доступен верхний `window`:
            //
            // Примечания:
            // - Получаем `URL` который является урлом исходной страницы.
            // - Полученный `URL` - `origin` страницы (то есть `URL` без пути, например, `https://example.com`).
            // - Не поддерживается в `Firefox`.
            if (topAncestorOrigin) {
                this._topRef = topAncestorOrigin;
                this._isTopRefAccurate = true;
                this._isFullTopRefAvailable = 0;
                return;
            }
            // 3. Если самый верхний доступный `window` не является `window.top`, и `ancestorOrigins` недоступен:
            //
            // Примечания:
            // - Полученный `URL` не является урлом исходной страницы, а является урлом фрейма.
            this._topRef = referrer || href;
            this._isTopRefAccurate = false;
            this._isFullTopRefAvailable = -1;
        }
        /**
         * Возвращает `URL` исходной страницы, если он доступен.
         *
         * @returns `URL` исходной страницы.
         *
         * @remarks
         * **Примечание: возвращаемое значение может быть:**
         * - **Полным `URL` страницы** (например, `https://example.com/path/page.html?query=1`)
         * - **Неполным `URL`** — только `origin` (например, `https://example.com/`)
         * - **URL фрейма**, если доступ к родительскому окну ограничен (в `Firefox`)
         *
         * Для определения точности и полноты значения рекомендуется использовать:
         * - {@link isTopRefAccurate} — указывает, действительно ли {@link topReferrer} относится к исходной странице
         * - {@link isFullTopRefAvailable} — указывает, является ли значение полным `URL`
         */
        get topReferrer() {
            return this._topRef;
        }
        /**
         * Возвращает cамый верхний window.
         * @returns cамый верхний window.
         */
        get topWindow() {
            return this._topWin;
        }
        /**
         * Определяет, размещен ли скрипт напрямую на странице.
         * @returns true, если скрипт размещен напрямую на странице, и false - если внутри фрейма.
         */
        get onPage() {
            return this._location === LocationTypes.OnPage;
        }
        /**
         * Определяет, находится ли скрипт внутри кроссдоменного фрейма.
         * @returns true, если скрипт находится внутри кроссдоменного фрейма, иначе false.
         */
        get inCrossDomainFrame() {
            return this._location === LocationTypes.CrossDomainFrame;
        }
        /**
         * Определяет, находится ли скрипт, внутри фрейма на том же домене.
         * @returns true, если скрипт находится внутри фрейма на том же домене, иначе false.
         */
        get inSameDomainFrame() {
            return this._location === LocationTypes.SameDomainFrame;
        }
        /**
         * Определяет, доступен ли полный `URL` страницы, на которой выполняется скрипт.
         *
         * Под "полным URL" понимается строка, включающая протокол, домен, путь и параметры запроса,
         * например: `https://example.com/path/page.html?param=value`.
         * Если доступен только `origin` (например, `https://example.com/`), считается, что полный URL недоступен.
         *
         * @returns
         * - `1` - если доступен полный `URL` исходной страницы.
         * - `0` - если доступен только `origin` исходной страницы.
         * - `-1` - если не доступен `URL` исходной страницы.
         *
         * @remarks
         * **Полный URL доступен в следующих случаях:**
         * - Скрипт выполняется напрямую на странице (не во фрейме).
         * - Скрипт находится внутри `iframe` того же домена, что и верхнее окно.
         * - Скрипт выполняется в кросс-доменном фрейме, если одновременно выполняются условия:
         *    - На странице установлен тег `<meta name="referrer" content="no-referrer-when-downgrade">`
         *    - Последний доступный фрейм явно ссылается на верхнее окно (`window.top`)
         * - В старых версиях браузеров, когда последний доступный фрейм явно ссылается на верхнее окно:
         *    - Chrome версии ниже 89
         *    - Firefox версии ниже 87
         *    - Safari версии ниже 13
         *
         * **Недоступен `URL` исходной страницы в следующих случаях:**
         * - В браузере `Firefox`, когда последний доступный фрейм не ссылается на верхнее окно:
         *
         * @example
         * // Пример полного URL (возвращает true):
         * https://example.com/any/path/index.html
         *
         * // Пример неполного URL (возвращает false):
         * https://example.com/
         */
        get isFullTopRefAvailable() {
            return this._isFullTopRefAvailable;
        }
        /**
         * Возвращает доступное окно.
         * @returns window, если скрипт находится в кросс-доменном iframe, иначе самый верхний window в текущей иерархии окон.
         */
        get accessibleTopWindow() {
            return this._location === LocationTypes.CrossDomainFrame ? window : this._topWin;
        }
        /**
         * Возвращает флаг, указывающий, соответствует ли значение {@link topReferrer} фактическому `URL` исходной страницы.
         *
         * @returns `true` если {@link topReferrer} является `URL` исходной страницы, иначе `false`;
         *
         * @remarks
         * Этот флаг актуален только для `Firefox`, где из-за отсутствия `ancestorOrigins` значение {@link topReferrer} может
         * указывать не на `URL` исходной страницы, а на `URL` самого фрейма — если верхнее окно недоступно из текущего контекста.
         * В других браузерах {@link topReferrer} всегда считается точным.
         */
        get isTopRefAccurate() {
            return this._isTopRefAccurate;
        }
        /**
         * Возвращает текущий урл окна, в котором выполняется скрипт.
         *
         * Если скрипт выполняется во фрейме с адресом `"about:blank"` (например, в iframe без заданного `src`),
         * выполняется подъём по цепочке родительских окон до тех пор, пока не будет найден первый валидный урл.
         *
         * @see https://jira.projects.x/browse/JS-1867
         */
        get currentReferrer() {
            return this._currentReferrer;
        }
    }

    /**
     * Класс Style предназначен для вставки тега `style` в DOM и применения стилей к указанным элементам на веб-странице.
     *
     * @remarks
     * Класс принимает строку с CSS стилями в котором есть макрос "![class]", который заменяется на рандомный класс.
     * Этот рандомный класс можно задать элементам с помощью метода {@link addTo}, чтобы задать стили.
     *
     * @example
     * Пример использования:
     * const styles = `
     *  ![class] { position: absolute; }
     *  ![class].red { color: red; }
     * `
     * new Style(styles);
     */
    class Style {
        /**
         * Элемент `style`, в котором хранятся определения стилей.
         */
        styleElement;
        /**
         * Рандомный класс.
         */
        className;
        /**
         * @param styles - строка, содержащая CSS-стили, в которой вместо класса указан макрос "![class]".
         */
        constructor(styles) {
            this.className = getRandomString(8);
            this.styleElement = document.createElement("style");
            this.styleElement.innerHTML = styles.replace(/!\[class\]/g, `.${this.className}`);
        }
        /**
         * Вставляет тег `style` в указанный элемент.
         * @param slot - элемент, в который будет вставлен тег `style`.
         */
        insertInto(slot) {
            slot.append(this.styleElement);
        }
        /**
         * Добавляет {@link className} к указанным элементам.
         * @param elements - элементы, которым нужно задать класс.
         */
        addTo(...elements) {
            elements.forEach((element) => element.classList.add(this.className));
        }
        /**
         * Удаляет {@link className} из элементов.
         * @param elements - элементы, из которых нужно удалить класс.
         */
        removeFrom(...elements) {
            elements.forEach((element) => element.classList.remove(this.className));
        }
        /**
         * Удаляет тег `style`.
         */
        destroy() {
            this.styleElement.remove();
        }
    }

    /**
     * Класс для работы с iframe-элементами.
     */
    class Iframe {
        /**
         * iframe элемент
         */
        frame;
        /**
         * @param config - {@link IframeConfig|конфигурация} для создания iframe.
         */
        constructor(config) {
            this.frame = document.createElement("iframe");
            this.frame.src = config.url;
            this.frame.title = "iframe";
            if (config.styles) {
                setStyles(this.frame, config.styles);
            }
            if (config.attributes) {
                setAttributes(this.frame, config.attributes);
            }
        }
        /**
         * Геттер для получения iframe-элемента.
         */
        get element() {
            return this.frame;
        }
        /**
         * Вставляет iframe в указанный HTML-элемент.
         *
         * @param slot - HTML-элемент, в который будет вставлен iframe.
         */
        insertInto(slot) {
            slot.appendChild(this.frame);
        }
        /**
         * Удаляет iframe.
         */
        destroy() {
            this.frame.remove();
        }
    }

    /**
     * Стили для скрытого iframe.
     */
    const HIDDEN_FRAME_STYLES = {
        position: "absolute",
        width: "0px",
        height: "0px",
        border: "0px",
        padding: "0px",
        margin: "0px"
    };
    /**
     * Класс для создания скрытого iframe.
     * Наследуется от класса {@link Iframe}.
     */
    class HiddenIframe extends Iframe {
        /**
         * @param url - URL, который будет установлен как источник iframe.
         */
        constructor(url) {
            super({
                url: url,
                styles: HIDDEN_FRAME_STYLES
            });
        }
    }

    /**
     * Максимальное значение для z-index.
     *
     * @see https://developer.mozilla.org/ru/docs/Web/CSS/z-index
     */
    const MAX_Z_INDEX = 2147483647;
    /**
     * Стили для дебаг-лога.
     */
    const DEBUG_GUI_STYLES = /* css */ `
![class], ![class] * {
    box-sizing: border-box;
}

![class] {
    margin: 8px;
    margin-bottom: 16px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: ${MAX_Z_INDEX};
    font-size: 16px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 8px;
}

![class] button {
    margin: 0px;
    display: grid;
    place-content: center;
    border-radius: 8px;
    border: 1px solid transparent;
    cursor: pointer;
    font-size: inherit;
}

![class] button:active {
    border-color: #000;
}

.${"log" /* ClassName.Log */} {
    display: none;
    max-width: 95vw;
    max-height: 80vh;
    margin-top: 16px;
    position: relative;
    overflow: scroll;
}

.${"log--open" /* ClassName.LogOpen */} .${"log" /* ClassName.Log */} {
    display: block;
}

.${"log__visibility-button" /* ClassName.LogVisibilityButton */} {
    padding: 4px 8px;
    background-color: lightgreen;
}

.${"log--open" /* ClassName.LogOpen */} .${"log__visibility-button" /* ClassName.LogVisibilityButton */} {
    background-color: pink;
}

.${"log__scroll-control-button" /* ClassName.LogScrollControlButton */} {
    position: sticky;
    top: 0px;
    left: 0px;
    background-color: lightgreen;
    padding: 4px 8px;
}

.${"log__box--no-auto-scroll" /* ClassName.LogBoxAutoScroll */} .${"log__scroll-control-button" /* ClassName.LogScrollControlButton */} {
    background-color: pink;
}

.${"log__box" /* ClassName.LogBox */} > .${"log__block" /* ClassName.LogBlock */} > .${"log__block-title" /* ClassName.LogBlockTitle */} {
    display: none;
}

.${"log__block" /* ClassName.LogBlock */} {
    width: fit-content;
    margin-left: 16px;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.${"log__block-title" /* ClassName.LogBlockTitle */} {
    display: flex;
    gap: 8px;
    align-items: center;
    font-weight: 900;
    margin-bottom: 8px;
    min-height: 30px;
}

.${"log__block--closed" /* ClassName.LogBlockClosed */} > :not(.${"log__block-title" /* ClassName.LogBlockTitle */}) {
    display: none;
}

.${"log__block-visibility-button" /* ClassName.LogBlockVisibilityButton */} {
    width: 30px;
    height: 30px;
    background-color: pink;
}

.${"log__block--closed" /* ClassName.LogBlockClosed */} .${"log__block-visibility-button" /* ClassName.LogBlockVisibilityButton */} {
    background-color: lightgreen;
}

.${"log__event" /* ClassName.LogEvent */} {
    display: flex;
    text-wrap: nowrap;
    margin-bottom: 8px;
    gap: 8px;
}

.${"log__event" /* ClassName.LogEvent */}:nth-child(even) {
    background-color: #f0f0f0;
}

.${"log__block--closed" /* ClassName.LogBlockClosed */} .${"log__event" /* ClassName.LogEvent */} {
    display: none;
}

.${"log__event" /* ClassName.LogEvent */}.${"log__event--error" /* ClassName.LogEventError */} {
    background-color: rgba(255, 0, 0, 0.4);
}

.${"line-num" /* ClassName.LineNum */} {
    min-width: 20px;
    color: #999;
}

.${"event__type" /* ClassName.EventType */} {
    color: green;
}

.${"log__event--error" /* ClassName.LogEventError */} .${"event__type" /* ClassName.EventType */} {
    color: #000;
    font-weight: 900;
}

.${"event__timestamp" /* ClassName.EventTimestamp */} {
    color: purple;
}

.${"event__coordinate" /* ClassName.EventCoordinate */} {
    color: #00f;
}

.${"event__payload" /* ClassName.EventPayload */} {
    color: black;
    border-right: 1px solid gray;
    padding-right: 8px;
}
`;

    /**
     * Класс, создающий разметку для дебаг-лога.
     */
    class DebugMarkup {
        /** Корневой элемент разметки. */
        element;
        /** Элемент для вставки событий лога. */
        logBox;
        /** Флаг, указывающий, включена ли автоматическая прокрутка к новому событию. */
        autoScroll;
        /** Флаг, указывающий, открыт ли дебаг-лог. */
        isLogOpened;
        /** Версия продукта для отображения. */
        version;
        constructor(version) {
            this.autoScroll = true;
            this.isLogOpened = false;
            this.version = version ? ` – v.${version}` : "";
            this.element = document.createElement("div");
            this.element.classList.add("log__box--no-auto-scroll" /* ClassName.LogBoxAutoScroll */);
            this.element.innerHTML = /* html */ `
        <button class="${"log__visibility-button" /* ClassName.LogVisibilityButton */}">${"open debug" /* VisibilityButtonLabel.Closed */}</button>
        <div class="${"log" /* ClassName.Log */}">
            <button class="${"log__scroll-control-button" /* ClassName.LogScrollControlButton */}">${"stop auto scroll" /* ScrollControlButtonLabel.On */}</button>
            <div class="${"log__box" /* ClassName.LogBox */}"></div>
        </div>
        `;
            this.logBox = this.element.querySelector(`.${"log__box" /* ClassName.LogBox */}`);
            const style = new Style(DEBUG_GUI_STYLES);
            style.addTo(this.element);
            style.insertInto(this.element);
            this.addListeners();
        }
        /**
         * Вставляет разметку в переданный слот.
         * @param slot - слот, в который будет вставлена разметка.
         */
        insertInto(slot) {
            slot.appendChild(this.element);
        }
        /**
         * Удаляет разметку.
         */
        destroy() {
            this.element.remove();
        }
        /**
         * Возвращает элемент для вставки событий.
         */
        getLogBox() {
            return this.logBox;
        }
        /**
         * Возвращает флаг, указывающий, включена ли автоматическая прокрутка к новому событию.
         */
        isScrollOn() {
            return this.autoScroll;
        }
        /**
         * Добавляет слушателей событий на кнопки.
         */
        addListeners() {
            const visibilityButton = this.element.querySelector(`.${"log__visibility-button" /* ClassName.LogVisibilityButton */}`);
            visibilityButton.addEventListener("click", () => {
                this.isLogOpened = !this.isLogOpened;
                this.element.classList.toggle("log--open" /* ClassName.LogOpen */, this.isLogOpened);
                visibilityButton.textContent = this.isLogOpened
                    ? "close debug" /* VisibilityButtonLabel.Opened */ + this.version
                    : "open debug" /* VisibilityButtonLabel.Closed */;
            });
            const scrollButton = this.element.querySelector(`.${"log__scroll-control-button" /* ClassName.LogScrollControlButton */}`);
            scrollButton.addEventListener("click", () => {
                this.autoScroll = !this.autoScroll;
                this.element.classList.toggle("log__box--no-auto-scroll" /* ClassName.LogBoxAutoScroll */, this.autoScroll);
                scrollButton.textContent = this.autoScroll
                    ? "stop auto scroll" /* ScrollControlButtonLabel.On */
                    : "start auto scroll" /* ScrollControlButtonLabel.Off */;
            });
        }
    }

    /**
     * Класс, создающий разметку для блока лога.
     */
    class LogBlock {
        /** HTML-элемент, в котором размещается блок лога. */
        element;
        /** Признак открытости блока. */
        isOpen;
        constructor(name, startLine) {
            this.isOpen = true;
            this.element = document.createElement("div");
            this.element.classList.add("log__block" /* ClassName.LogBlock */);
            this.element.innerHTML = /* html */ `
        <div class="${"log__block-title" /* ClassName.LogBlockTitle */}">
            <div class="${"log__block-start-line" /* ClassName.LogBlockStartLine */}">${startLine}</div>
            <button class="${"log__block-visibility-button" /* ClassName.LogBlockVisibilityButton */}">${"-" /* VisibilityButtonLabel.Opened */}</button>
            <div class="${"log__block-name" /* ClassName.LogBlockName */}">${name}</div>
        </div>
`;
            this.addListeners();
        }
        /**
         * Вставляет разметку в переданный слот.
         * @param slot - слот, в который будет вставлена разметка.
         */
        insertInto(slot) {
            slot.appendChild(this.element);
        }
        /**
         * Возвращает основной HTML-элемент блока.
         */
        getElement() {
            return this.element;
        }
        /**
         * Добавляет слушателей событий на кнопки.
         */
        addListeners() {
            const visibilityButton = this.element.querySelector(`.${"log__block-visibility-button" /* ClassName.LogBlockVisibilityButton */}`);
            visibilityButton.addEventListener("click", () => {
                this.isOpen = !this.isOpen;
                this.element.classList.toggle("log__block--closed" /* ClassName.LogBlockClosed */, !this.isOpen);
                visibilityButton.textContent = this.isOpen
                    ? "-" /* VisibilityButtonLabel.Opened */
                    : "+" /* VisibilityButtonLabel.Closed */;
            });
        }
        /**
         * Проверяет, является ли переданный элемент блоком лога.
         */
        static isBlock(element) {
            return Boolean(element?.classList.contains("log__block" /* ClassName.LogBlock */));
        }
    }

    /**
     * Подготовавливает значение к выводу на страницу.
     * @param value - значение, которое нужно обработать.
     *
     * @returns Для функций возвращается их имя.
     * Для элементов DOM, возвращается их тег (для document – "Document").
     * Для объектов и массивов выводятся значения (для читаемости добавляются дополняются отступы между скобками и элементами).
     * Для экземляров классов возвращается имя класса.
     * Остальное типы приводятся к строке.
     */
    const processValue = (value) => {
        if (htmlDocumentElement(value)) {
            return "Document";
        }
        if (htmlElement(value)) {
            return `Element ${value.tagName.toLowerCase()}`;
        }
        if (typeof value === "function") {
            return `Function ${value.name || "anonymous"}`;
        }
        if (Array.isArray(value)) {
            return `[ ${value.map(processValue).join(", ")} ]`;
        }
        if (object(value)) {
            if (value.constructor.name === "Object") {
                return `{ ${Object.entries(value).reduce((acc, [key, value]) => {
                acc.push(`${processValue(key)}: ${processValue(value)}`);
                return acc;
            }, []).join(", ")} }`;
            }
            return `Instance of ${value.constructor.name}`;
        }
        return String(value);
    };

    /**
     * Класс, создающий разметку для событий лога.
     */
    class LogEvent {
        /** Основной HTML-элемент события лога. */
        element;
        constructor(event, lineNum) {
            this.element = document.createElement("div");
            this.element.classList.add("log__event" /* ClassName.LogEvent */);
            if (event.type === "error" /* DebugEventType.Error */) {
                this.element.classList.add("log__event--error" /* ClassName.LogEventError */);
            }
            this.element.innerHTML = /* html */ `
            <div class="${"line-num" /* ClassName.LineNum */}">${lineNum}</div>
            <div class="${"event__type" /* ClassName.EventType */}">${event.type}</div>
            <div class="${"event__timestamp" /* ClassName.EventTimestamp */}">${event.timestamp}</div>
            <div class="${"event__coordinate" /* ClassName.EventCoordinate */}">${event.coordinate}</div>
        `;
            Object.entries(event.payload).forEach(([key, value]) => {
                const eventPayload = document.createElement("div");
                eventPayload.classList.add("event__payload" /* ClassName.EventPayload */);
                eventPayload.textContent = `${key}: ${processValue(value)}`;
                this.element.appendChild(eventPayload);
            });
        }
        /**
         * Вставляет разметку в переданный слот.
         * @param slot - слот, в который будет вставлена разметка.
         * @param shouldScroll - флаг, указывающий на необходимость прокрутки к новому событию.
         */
        insertInto(slot, shouldScroll) {
            slot.appendChild(this.element);
            if (shouldScroll) {
                this.element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start"
                });
            }
        }
    }

    /**
     * Класс для визуального отображения лога дебаг-событий.
     */
    class DebugGui {
        /** Разметка лога. */
        markup;
        /** Элемент, в который будут вставляться новые события. */
        currentBlockElement;
        /** Порядковый номер следующего события. */
        eventCount;
        /**
         * @param version - версия продукта, чьи события логируются.
         */
        constructor(version) {
            this.markup = new DebugMarkup(version);
            this.currentBlockElement = this.markup.getLogBox();
            this.eventCount = 0;
            this.startNewBlock("global");
        }
        /**
         * Вставляет разметку в переданный слот.
         * @param slot - слот, в который будет вставлена разметка.
         */
        insertInto(slot) {
            this.markup.insertInto(slot);
        }
        /**
         * Удаляет визуальное отображение.
         */
        destroy() {
            this.markup.destroy();
        }
        /**
         * Отрисовывает отдельное событие.
         * @param event - событие.
         *
         * @remarks Вложенность события зависит от его параметра `block`.
         */
        renderEvent(event) {
            switch (event.block) {
                case "start": {
                    this.startNewBlock(event.payload.name);
                    this.addEvent(event);
                    break;
                }
                case "end": {
                    this.addEvent(event);
                    this.currentBlockElement = LogBlock.isBlock(this.currentBlockElement.parentElement)
                        ? this.currentBlockElement.parentElement
                        : this.currentBlockElement;
                    break;
                }
                case "keep": {
                    this.addEvent(event);
                    break;
                }
            }
        }
        /**
         * Отрисовывает полный лог событий.
         * @param events - массив событий.
         */
        renderLog(events) {
            events.forEach((event) => this.renderEvent(event));
        }
        /**
         * Создаёт и вставляет в лог новое событие.
         * @param event - событие.
         */
        addEvent(event) {
            const newEvent = new LogEvent(event, this.eventCount);
            newEvent.insertInto(this.currentBlockElement, this.markup.isScrollOn());
            this.eventCount += 1;
        }
        /**
         * Создаёт и вставляет в лог новый блок.
         * @param name - имя блока.
         */
        startNewBlock(name) {
            const newBlock = new LogBlock(name, this.eventCount);
            newBlock.insertInto(this.currentBlockElement);
            this.currentBlockElement = newBlock.getElement();
        }
    }

    /**
     * Логгер событий дебага.
     */
    class DebugLogger {
        /** Зафиксированные события дебага. */
        events;
        /** Подписчики на события дебага. */
        subscribers;
        constructor() {
            this.events = [];
            this.subscribers = [];
        }
        pushEvent(event) {
            this.events.push(event);
            this.subscribers.forEach((subscriber) => subscriber(event));
        }
        getFullLog() {
            return this.events;
        }
        subscribe(cb) {
            this.subscribers.push(cb);
        }
    }

    /// <reference types="@acl/interfaces/debug-logger-declaration" />
    /**
     * Инициализирует логгер событий дебага.
     */
    const initDebugLogger = () => {
        window.debugLogger = new DebugLogger();
    };

    /**
     * Url фрейма который будет загружен.
     */
    const FRAME_URL = "https://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=780801&bt=21&pid=3915086&bid=10043329&bn=10043329&rnd=527366301&tuid=1&cfa=1";
    /**
     * Время ожидания загрузки фрейма в миллисекундах, по истечению этого времени будет выброшена ошибка.
     */
    const TIMEOUT = 7000;

    /**
     * Класс для получения eCid.
     */
    class EcidLoader {
        /** Экземпляр класса EcidLoader. EcidLoader является singleton. */
        static instance;
        /** Промис, который разрешится в строку, которая будет содержать ecid. */
        ecid;
        /** Создает экземпляр EcidLoader если он еще не был создан. */
        constructor() {
            if (EcidLoader.instance) {
                return EcidLoader.instance;
            }
            EcidLoader.instance = this;
        }
        /**
         * Загружает фрейм для получения ecid.
         * @returns {@link EcidLoader.ecid}
         * @throws Error<AdriverError: {@link ErrorCodes.Etag.TimeOutError}> если нет ответа от фрейма дольше чем {@link TIMEOUT}.
         * @throws Error<AdriverError: {@link ErrorCodes.Etag.InvalidEcid}> если в ответе фрейма, в поле ecid,
         * лежит не строка или пустая строка.
         *
         * @remarks
         * Метод загружает фрейм, данный фрейм содержит в себе скрипт с отправкой ecid всем внешним окнам, в методе так
         * же присутствует подписка на это событие от фрейма. После получения ecid, метод возвращает его. Если не получилось
         * загрузить фрейм в течении определенного времени, или ecid оказался некорректным, будет выброшена ошибка.
         */
        getEcid() {
            if (!this.ecid) {
                const url = new URI(FRAME_URL);
                const urlString = url.toString();
                const frame = new HiddenIframe(urlString);
                // Такая запись для того чтобы инитить readonly свойства в методе
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.ecid = new Promise((resolve, reject) => {
                    const expectedOrigin = url.origin;
                    const messageHandler = (msg) => {
                        if (msg.origin !== expectedOrigin
                            || !msg?.data
                            || !Object.prototype.hasOwnProperty.call(msg.data, "eCid")) {
                            return;
                        }
                        frame.destroy();
                        window.removeEventListener("message", messageHandler);
                        clearTimeout(timeOutHandler);
                        if (!string(msg.data.eCid) || isEmptyString(msg.data.eCid)) {
                            reject(new AdriverError(EtagErrors.InvalidEcid));
                        }
                        else {
                            resolve(msg.data.eCid);
                        }
                    };
                    const timeOutHandler = setTimeout(() => {
                        frame.destroy();
                        window.removeEventListener("message", messageHandler);
                        reject(new AdriverError(EtagErrors.TimeOutError));
                    }, TIMEOUT);
                    window.addEventListener("message", messageHandler);
                });
                // добавление фрейма в DOM после загрузки страницы
                // см. https://jira.projects.x/browse/JS-1789
                waitForPageLoad().then(() => {
                    frame.insertInto(document.body);
                });
            }
            return this.ecid;
        }
    }

    /* istanbul ignore file */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    const createNoMraidParams = () => {
        window.noMraid = () => { };
        window.mraid = {
            close: window.noMraid,
            open: (link) => {
                window.open(link);
            },
            getVersion: () => "0",
            addEventListener: window.noMraid,
            useCustomClose: window.noMraid,
            isViewable: () => false,
            getState: () => "ready"
        };
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams*/
    const buildTrackerUrl$1 = (url, type) => {
        const urlInstance = new URL(url);
        if (type === "click" && urlInstance.hostname.includes("adriver")) {
            urlInstance.searchParams.set("ju", btoa(window.navigator.userAgent));
            urlInstance.searchParams.set("fsid", new URL(localParams.clickURL).searchParams.get("xpid"));
        }
        return urlInstance.toString();
    };

    /* istanbul ignore file */
    const sendPigeon$1 = (uri) => {
        if (!uri) {
            return;
        }
        const pigeonUrl = new URI(uri)
            .setRnd()
            .toString();
        new Pigeon(pigeonUrl)
            .send();
    };

    /* istanbul ignore file */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams, adrivermraiddata*/
    const callTrackingEvent$1 = (type) => {
        if (localParams.TrackingEvents?.[type]) {
            localParams.TrackingEvents[type].forEach((item) => sendPigeon$1(item));
        }
        if (adrivermraiddata?.trackers?.[type]) {
            adrivermraiddata.trackers[type].forEach((item) => {
                const url = buildTrackerUrl$1(item, type);
                sendPigeon$1(url);
            });
        }
    };

    /* istanbul ignore file */
    const httplize$1 = (uri) => {
        const pat = new RegExp("^(https?:\\/\\/)");
        if (pat.test(uri)) {
            uri = uri.indexOf("http:") == 0 ? uri.split("http:").join("https:") : uri;
        }
        else if (/^\/\//.test(uri)) {
            uri = "https:" + uri;
        }
        else {
            uri = "https://" + uri;
        }
        return uri;
    };

    /* istanbul ignore file */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams */
    const loadJsTrackers$1 = () => {
        try {
            if (localParams.jstracker?.length > 0) {
                for (const tracker of localParams.jstracker) {
                    const scriptElement = document.createElement("script");
                    scriptElement.setAttribute("type", "text/javascript");
                    scriptElement.setAttribute("src", httplize$1(tracker.split("![rnd]").join(Math.round(Math.random() * 9999999))));
                    document.body.appendChild(scriptElement);
                }
            }
        }
        catch (e) { /* empty */ }
    };

    /* istanbul ignore file */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams */
    const sendEvent$1 = (type, cus) => {
        let uri = localParams.clickURL.split("click.cgi").join("event.cgi") + "&type=" + type;
        if (cus) {
            if (uri.indexOf("&custom=") == -1) {
                uri += "&custom=";
            }
            uri = uri.split("&custom=").join("&custom=" + cus);
        }
        sendPigeon$1(uri);
        switch (type) {
            case 0:
                callTrackingEvent$1("impression");
                loadJsTrackers$1();
                break;
            case 1:
                callTrackingEvent$1("creativeView");
                break;
            case 2:
                callTrackingEvent$1("start");
                break;
            case 3:
                callTrackingEvent$1("midpoint");
                break;
            case 4:
                callTrackingEvent$1("firstQuartile");
                break;
            case 5:
                callTrackingEvent$1("thirdQuartile");
                break;
            case 6:
                callTrackingEvent$1("complete");
                break;
            case 7:
                callTrackingEvent$1("mute");
                break;
            case 8:
                callTrackingEvent$1("unmute");
                break;
            case 9:
                callTrackingEvent$1("pause");
                break;
            case 11:
                callTrackingEvent$1("resume");
                break;
            case 15:
                callTrackingEvent$1("close");
                break;
            case 16:
                callTrackingEvent$1("fullscreen");
                break;
            case 17:
                callTrackingEvent$1("exitFullscreen");
                break;
            case 53:
                callTrackingEvent$1("viewability");
                break;
        }
    };

    /* istanbul ignore file */
    /* eslint-disable @typescript-eslint/explicit-member-accessibility */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global MRAID_ENV, mraid, localParams*/
    class MraidCore {
        firstStart;
        version;
        mraid_env;
        advID;
        sdkVersion;
        sdkName;
        appID;
        startTime;
        currentTime;
        viewable;
        viewableAdd;
        viewableTime;
        viewableState;
        viewabilityVersion;
        measurable;
        widthNow;
        heightNow;
        oneSecPoint;
        isiOS;
        customsMap;
        ecid;
        impressionIsSent;
        constructor() {
            this.firstStart = true;
            this.version = 0;
            this.mraid_env = false;
            this.advID = 0;
            this.sdkVersion = 0;
            this.sdkName = 0;
            this.appID = 0;
            this.startTime = (new Date).getTime();
            this.currentTime = 0;
            this.viewable = false;
            this.viewableAdd = false;
            this.viewableTime = undefined;
            this.viewableState = 0;
            this.viewabilityVersion = 0;
            this.measurable = 1;
            this.widthNow = 0;
            this.heightNow = 0;
            this.oneSecPoint = 1;
            this.isiOS = IOS() && !window.MSStrea;
            this.customsMap = {
                viewability: []
            };
            this.ecid = null;
            this.impressionIsSent = false;
            this.onViewabilityChange = this.onViewabilityChange.bind(this);
            // если успеем получить до отправки 0 события - отправим в нем, иначе отправим в 150 событии
            new EcidLoader().getEcid()
                .then((ecid) => {
                this.ecid = ecid;
                if (this.impressionIsSent) {
                    sendEvent$1(150, `299=${ecid}`);
                }
            })
                .catch(() => { });
        }
        init() {
            if (typeof MRAID_ENV !== "undefined") {
                this.version = parseInt(MRAID_ENV.version, 10) || 0;
                this.mraid_env = true;
                this.getMraidEnvParams();
            }
            if (/loaded|complete/.test(document.readyState) || !this.firstStart) {
                if (typeof mraid !== "undefined") {
                    if (mraid.getState() === "loading" && this.firstStart) {
                        mraid.addEventListener("ready", this.init.bind(this));
                        return;
                    }
                }
                else {
                    createNoMraidParams();
                }
            }
            else {
                if (this.firstStart) {
                    this.firstStart = false;
                    this.onLoadF(this.init);
                    return;
                }
            }
            function handleViewableChange() {
                if (mraid.isViewable() || !localParams.showOnViewOnly) {
                    this.showAd();
                }
                else {
                    const handleViewableChangeEventBind = function (viewable) {
                        if (viewable) {
                            mraid.removeEventListener("viewableChange", handleViewableChangeEventBind);
                            this.showAd();
                        }
                    }.bind(this);
                    mraid.addEventListener("viewableChange", handleViewableChangeEventBind);
                }
            }
            this.version = parseInt(mraid.getVersion(), 10);
            switch (this.version) {
                case 0:
                    this.measurable = 0;
                    this.showAd();
                    break;
                case 1:
                    this.viewabilityVersion = 7;
                    handleViewableChange.call(this);
                    break;
                case 2:
                    this.viewabilityVersion = 4;
                    handleViewableChange.call(this);
                    break;
                case 3:
                    this.viewabilityVersion = 5;
                    if (!localParams.showOnViewOnly) {
                        this.showAd();
                    }
                    else {
                        mraid.addEventListener("exposureChange", function (proc) {
                            if (proc >= 50) {
                                mraid.removeEventListener("exposureChange", this.onViewabilityChange);
                                this.showAd();
                            }
                        }.bind(this));
                    }
                    break;
                default:
                    this.version = 0;
                    this.showAd();
                    break;
            }
        }
        getMraidEnvParams() {
            try {
                if (this.mraid_env) {
                    this.sdkName = MRAID_ENV.sdk || 0;
                    this.sdkVersion = MRAID_ENV.sdkVersion || 0;
                    this.appID = MRAID_ENV.appId || 0;
                    this.advID = MRAID_ENV.ifa || 0;
                }
            }
            catch (e) {
                this.sdkName = 0;
                this.sdkVersion = 0;
                this.appID = 0;
                this.advID = 0;
            }
        }
        onLoadF(callback, win) {
            const winCheck = win || window;
            if (/in/.test(winCheck)) {
                winCheck.addEventListener("load", callback.bind(this));
            }
        }
        onViewabilityChange(viewableState) {
            if (!localParams.viewable) {
                const oldViewableState = this.viewableState;
                // версии 1 и 2 используют значение 0 или 100, а версия 3 использует переданное состояние напрямую
                switch (this.version) {
                    case 1:
                    case 2:
                        this.viewableState = (!viewableState ? 0 : 100);
                        break;
                    case 3:
                        this.viewableState = viewableState;
                        break;
                }
                if (oldViewableState < 50 && this.viewableState >= 50) {
                    this.changeViewabilityStatus(true);
                }
                else if (oldViewableState >= 50 && this.viewableState < 50) {
                    this.changeViewabilityStatus(false);
                }
            }
            else {
                this.unsubFromViewability();
            }
        }
        startViewabilityCheck() {
            if ((this.version === 1 || this.version === 2)
                && this.viewableState !== 100
                && mraid.isViewable()) {
                this.changeViewabilityStatus(true);
            }
        }
        sendViewabilityEvents(type) {
            if (this.viewableState >= 50) {
                if ((!this.viewable && type === 53)
                    || (!this.viewableAdd && type === 69)) {
                    const cus = this.getCustoms(this.customsMap.viewability);
                    sendEvent$1(type, cus);
                }
                if (type === 53) {
                    if (this.viewableTimer) {
                        clearTimeout(this.viewableTimer);
                    }
                    this.viewable = true;
                }
                else if (type === 69) {
                    if (this.viewableTimerAdd) {
                        clearTimeout(this.viewableTimerAdd);
                    }
                    this.viewableAdd = true;
                }
                if (this.viewable
                    && (this.viewableAdd || localParams.additionalViewability === -1)) {
                    this.unsubFromViewability();
                }
            }
        }
        subToViewability() {
            if (localParams.additionalViewability === -1) {
                this.viewableAdd = true;
            }
            // в версиях 1 и 2 подписываемся на событие viewableChange,
            // а в версии 3 – на событие exposureChange
            switch (this.version) {
                case 1:
                case 2:
                    mraid.addEventListener("viewableChange", this.onViewabilityChange);
                    if (mraid.isViewable()) {
                        this.onViewabilityChange(true);
                    }
                    break;
                case 3:
                    mraid.addEventListener("exposureChange", this.onViewabilityChange);
                    break;
            }
        }
        unsubFromViewability() {
            // в версиях 1 и 2 отписываемся от viewableChange, а в версии 3 – от exposureChange
            switch (this.version) {
                case 1:
                case 2:
                    mraid.removeEventListener("viewableChange", this.onViewabilityChange);
                    break;
                case 3:
                    mraid.removeEventListener("exposureChange", this.onViewabilityChange);
                    break;
            }
        }
        getCustoms(customs, event = {}) {
            let finStr = "";
            for (const custom of customs) {
                switch (custom) {
                    case 113:
                        finStr += "113=" + ((localParams.additionalViewability !== -1) ? "1" : "0") + ";";
                        break;
                    case 115:
                        finStr += "115=" + this.viewabilityVersion + ";";
                        break;
                    case 116:
                        finStr += "116=" + this.appID + ";";
                        break;
                    case 117:
                        finStr += "117=" + this.advID + ";";
                        break;
                    case 118:
                        finStr += "118=" + this.sdkVersion + ";";
                        break;
                    case 119:
                        finStr += "119=" + this.sdkName + ";";
                        break;
                    case 129:
                        finStr += "129=" + "2.9.10" + ";";
                        break;
                    case 161:
                        finStr += "161=" + Math.round(this.widthNow) + ";";
                        break;
                    case 162:
                        finStr += "162=" + Math.round(this.heightNow) + ";";
                        break;
                    case 164:
                        finStr += "164=" + this.viewableState + ";";
                        break;
                    case 167:
                        finStr += "167=" + Math.round(this.currentTime) + ";";
                        break;
                    case 170:
                        finStr += "170=" + Math.round(this.getPlayerVolume() * 10) + ";";
                        break;
                    case 171:
                        finStr += "171=" + Math.round(localParams.duration) + ";";
                        break;
                    case 176:
                        finStr += "176=" + ((new Date).getTime() - this.startTime) + ";";
                        break;
                    case 177:
                        finStr += "177=" + this.measurable + ";";
                        break;
                    case 216:
                        finStr += "216=" + ((document && document.body && document.body.clientWidth) || 0) + ";";
                        break;
                    case 217:
                        finStr += "217=" + ((document && document.body && document.body.clientHeight) || 0) + ";";
                        break;
                    case 231:
                        finStr += "231=" + ("isTrusted" in event ? event.isTrusted ? 1 : 0 : -1) + ";";
                        break;
                    case 299:
                        finStr += (this.ecid ? "299=" + this.ecid + ";" : "");
                        break;
                    case 301:
                        finStr += "301=" + (window.navigator.userAgent ? btoa(window.navigator.userAgent) : -1) + ";";
                        break;
                    case 302:
                        finStr += "302=" + (window.navigator.standalone ?? -1) + ";";
                        break;
                }
            }
            return finStr;
        }
    }

    const HTML_CUSTOMS_MAP = {
        impression: [113, 115, 116, 117, 118, 119, 129, 161, 162, 164, 176, 177, 216, 217, 299, 301, 302],
        viewability: [115, 116, 117, 118, 119, 161, 162, 164, 176, 216, 217],
        click: [115, 116, 117, 118, 119, 161, 162, 164, 176, 216, 217, 231]
    };

    /* istanbul ignore file */
    const sendPigeon = (uri) => {
        if (!uri) {
            return;
        }
        const pigeonUrl = new URI(uri)
            .setRnd()
            .toString();
        new Pigeon(pigeonUrl)
            .send();
    };

    /* istanbul ignore file */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams*/
    const callClickTracker = () => {
        if (localParams.clickTracker) {
            sendPigeon(localParams.clickTracker);
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams*/
    const buildTrackerUrl = (url, type) => {
        const urlInstance = new URL(url);
        if (type === "click" && urlInstance.hostname.includes("adriver")) {
            urlInstance.searchParams.set("ju", btoa(window.navigator.userAgent));
            urlInstance.searchParams.set("fsid", new URL(localParams.clickURL).searchParams.get("xpid"));
        }
        return urlInstance.toString();
    };

    /* istanbul ignore file */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams, adrivermraiddata*/
    const callTrackingEvent = (type) => {
        if (localParams.TrackingEvents?.[type]) {
            localParams.TrackingEvents[type].forEach((item) => sendPigeon(item));
        }
        if (adrivermraiddata?.trackers?.[type]) {
            adrivermraiddata.trackers[type].forEach((item) => {
                const url = buildTrackerUrl(item, type);
                sendPigeon(url);
            });
        }
    };

    /* istanbul ignore file */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams, mraid*/
    const openOnClick = () => {
        if (localParams.clickThroughtTracker) {
            mraid.open(localParams.clickThroughtTracker + localParams.href);
        }
        else {
            mraid.open(localParams.href);
        }
    };

    /* istanbul ignore file */
    const httplize = (uri) => {
        const pat = new RegExp("^(https?:\\/\\/)");
        if (pat.test(uri)) {
            uri = uri.indexOf("http:") == 0 ? uri.split("http:").join("https:") : uri;
        }
        else if (/^\/\//.test(uri)) {
            uri = "https:" + uri;
        }
        else {
            uri = "https://" + uri;
        }
        return uri;
    };

    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams */
    const sendEclick = (cus) => {
        const baseUrl = localParams.clickURL.replace("click.cgi", "eclick.cgi");
        const eclickUrl = new URL(httplize(baseUrl));
        let customs = "";
        if (eclickUrl.searchParams.has("custom")) {
            customs = eclickUrl.searchParams.get("custom");
        }
        customs = cus + customs;
        eclickUrl.searchParams.set("custom", customs);
        sendPigeon(eclickUrl.toString());
    };

    /* istanbul ignore file */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams */
    const loadJsTrackers = () => {
        try {
            if (localParams.jstracker?.length > 0) {
                for (const tracker of localParams.jstracker) {
                    const scriptElement = document.createElement("script");
                    scriptElement.setAttribute("type", "text/javascript");
                    scriptElement.setAttribute("src", httplize(tracker.split("![rnd]").join(Math.round(Math.random() * 9999999))));
                    document.body.appendChild(scriptElement);
                }
            }
        }
        catch (e) { /* empty */ }
    };

    /* istanbul ignore file */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* global localParams */
    const sendEvent = (type, cus) => {
        let uri = localParams.clickURL.split("click.cgi").join("event.cgi") + "&type=" + type;
        if (cus) {
            if (uri.indexOf("&custom=") == -1) {
                uri += "&custom=";
            }
            uri = uri.split("&custom=").join("&custom=" + cus);
        }
        sendPigeon(uri);
        switch (type) {
            case 0:
                callTrackingEvent("impression");
                loadJsTrackers();
                break;
            case 1:
                callTrackingEvent("creativeView");
                break;
            case 2:
                callTrackingEvent("start");
                break;
            case 3:
                callTrackingEvent("midpoint");
                break;
            case 4:
                callTrackingEvent("firstQuartile");
                break;
            case 5:
                callTrackingEvent("thirdQuartile");
                break;
            case 6:
                callTrackingEvent("complete");
                break;
            case 7:
                callTrackingEvent("mute");
                break;
            case 8:
                callTrackingEvent("unmute");
                break;
            case 9:
                callTrackingEvent("pause");
                break;
            case 11:
                callTrackingEvent("resume");
                break;
            case 15:
                callTrackingEvent("close");
                break;
            case 16:
                callTrackingEvent("fullscreen");
                break;
            case 17:
                callTrackingEvent("exitFullscreen");
                break;
            case 53:
                callTrackingEvent("viewability");
                break;
        }
    };

    /* istanbul ignore file */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    /* eslint-disable @typescript-eslint/explicit-member-accessibility */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    /* global localParams*/
    class MraidHtml extends MraidCore {
        viewableTimer;
        viewableTimerAdd;
        collapseButton;
        mainDiv;
        mainFrame;
        frameUrl;
        constructor() {
            super();
            this.viewableTimer = undefined;
            this.viewableTimerAdd = undefined;
            this.collapseButton = undefined;
            this.mainDiv = undefined;
            this.mainFrame = undefined;
            this.frameUrl = undefined;
            this.customsMap = HTML_CUSTOMS_MAP;
            this.updateSize = this.updateSize.bind(this);
            this.init();
        }
        showAd() {
            this.mainDiv = document.querySelector("#AdrHTML");
            this.mainFrame = new Iframe({
                url: localParams.frameUrl,
                attributes: {
                    "scrolling": "no",
                    "marginwidth": 0,
                    "marginheight": 0,
                    "frameborder": 0,
                    "vspace": 0,
                    "hspace": 0,
                    "width": "100%",
                    "height": "100%"
                }
            });
            this.mainFrame.insertInto(this.mainDiv);
            this.updateSize();
            this.subToViewability();
            this.subToMraidEvents();
            const cus = this.getCustoms(this.customsMap.impression);
            sendEvent(0, cus);
            this.impressionIsSent = true;
            this.startViewabilityCheck();
            if (localParams.hoverButton) {
                this.initCoverButton();
            }
        }
        changeViewabilityStatus(isViewable) {
            if (isViewable) {
                this.viewableTimer = setTimeout(this.sendViewabilityEvents.bind(this), 1000, 53);
                if (localParams.additionalViewability !== -1) {
                    this.viewableTimerAdd = setTimeout(this.sendViewabilityEvents.bind(this), localParams.additionalViewability, 69);
                }
            }
            else {
                this.viewableTime = undefined;
                if (this.viewableTimer) {
                    clearTimeout(this.viewableTimer);
                }
                if (this.viewableTimerAdd) {
                    clearTimeout(this.viewableTimerAdd);
                }
            }
        }
        initCoverButton() {
            this.collapseButton = document.querySelector("#collapse");
            this.collapseButton.style.display = "block";
            this.clickButton = document.querySelector("#mainClick");
            this.clickButton.onclick = (evt) => {
                callTrackingEvent("click");
                callClickTracker();
                const cus = this.getCustoms(this.customsMap.click, evt);
                sendEclick(cus);
                openOnClick();
            };
        }
        subToMraidEvents() {
            mraid.addEventListener("sizeChange", this.updateSize);
        }
        updateSize() {
            this.widthNow = this.mainFrame.element.clientWidth;
            this.heightNow = this.mainFrame.element.clientHeight;
        }
    }

    /**
     * Логированная ошибка.
     */
    class ErrorEvent {
        type;
        timestamp;
        block;
        coordinate;
        payload;
        /**
         * Создаёт объект сигнала об ошибке.
         * @param err - объект ошибки.
         * @param fileName - имя обрабатываемого файла.
         * @param line - номер строки, на которой была объявлена функция, выбросившая ошибку,
         * или номер строки, на которой возникла глобальная ошибка.
         */
        constructor(err, fileName, line) {
            this.type = "error" /* DebugEventType.Error */;
            this.timestamp = Date.now();
            this.block = "end";
            this.coordinate = `${fileName}:${line}`;
            this.payload = {
                type: err?.name,
                message: err?.message
            };
        }
    }

    if (!window.onerror) {
        window.onerror = function (_message, source, lineno, _colno, err) {
            window.debugLogger.pushEvent(new ErrorEvent(err, source, lineno));
        };
    }
    if (!window.onunhandledrejection) {
        window.onunhandledrejection = function (err) {
            var _a, _b;
            window.debugLogger.pushEvent(new ErrorEvent({ name: (_a = err.type) !== null && _a !== void 0 ? _a : "unhandledrejection", message: (_b = err.reason) !== null && _b !== void 0 ? _b : "unknown" }, "global", 0));
        };
    }
    var debugGui = new DebugGui("2.9.10");
    debugGui.insertInto(document.body);
    initDebugLogger();
    window.debugLogger.subscribe(function (event) {
        // @no-debug
        debugGui.renderEvent(event);
    });
    var win = new MyLocation().accessibleTopWindow;
    win.adrivermraiddata = win.adrivermraiddata || {};
    win.adrivermraiddata.xpidImpressions = win.adrivermraiddata.xpidImpressions || new Set();
    if (localParams === null || localParams === void 0 ? void 0 : localParams.clickURL) {
        var xpid = new URL(localParams.clickURL).searchParams.get("xpid");
        if (xpid && !win.adrivermraiddata.xpidImpressions.has(xpid)) {
            win.adrivermraiddata.xpidImpressions.add(xpid);
            window.AdRiverMRAID = new MraidHtml();
        }
    }

    if (!window.onerror) {
        window.onerror = function (_message, source, lineno, _colno, err) {
            window.debugLogger.pushEvent(new ErrorEvent(err, source, lineno));
        };
    }
    if (!window.onunhandledrejection) {
        window.onunhandledrejection = function (err) {
            var _a, _b;
            window.debugLogger.pushEvent(new ErrorEvent({ name: (_a = err.type) !== null && _a !== void 0 ? _a : "unhandledrejection", message: (_b = err.reason) !== null && _b !== void 0 ? _b : "unknown" }, "global", 0));
        };
    }

})();
//# sourceMappingURL=index.js.map
