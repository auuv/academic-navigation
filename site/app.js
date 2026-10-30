const STORAGE_KEY = "journal-data-navigator:v6";
const MODES = new Set(["journals", "thinktanks", "news", "governments", "ai", "gas", "weekly"]);
const STAR_FILTER = "星标";
const { journals, thinkTanks, newsSources, governmentSites, aiSources } = window.ResourceCatalog;
const { sources: gasSources, categories: gasCategories } = window.GasProjectCatalog;
const resourceCategoryOrder = {
    gas: gasCategories,
    journals: [
        "检索入口与工作论文",
        "学术组织与职业",
        "综合科学",
        "经济学综合",
        "应用经济",
        "国际经济与贸易",
        "发展与区域",
        "公共经济",
        "宏观与金融",
        "产业组织与应用微观",
        "计量与方法",
        "金融学",
        "会计学",
        "经济学与管理",
        "政治学、国际关系与区域国别",
        "中国与区域国别",
        "东南亚与ASEAN研究",
        "地理、空间与区域",
        "历史与人类学",
        "社会学与人类学",
        "环境与能源",
        "创新与管理",
        "哲学与综合社科"
    ],
    thinktanks: [
        "中国智库",
        "美国智库",
        "英国智库",
        "欧洲智库",
        "加拿大智库",
        "澳大利亚智库",
        "东南亚与ASEAN智库",
        "南亚智库",
        "非洲智库",
        "拉美智库",
        "全球与跨区域智库",
        "智库目录"
    ],
    news: [
        "国际通讯社",
        "中国大陆新闻",
        "中国香港新闻",
        "中国台湾新闻",
        "美国新闻",
        "英国新闻",
        "欧洲新闻",
        "加拿大新闻",
        "东北亚新闻",
        "东南亚新闻",
        "南亚新闻",
        "中东新闻",
        "非洲新闻",
        "拉美新闻",
        "大洋洲新闻",
        "亚太新闻",
        "新闻数据与数据库"
    ],
    governments: [
        "多边与国际组织",
        "中国大陆政府",
        "中国港澳台政府",
        "美国政府",
        "日本政府",
        "韩国政府",
        "东盟与东南亚政府",
        "欧洲与英国政府",
        "大洋洲与加拿大政府",
        "南亚政府"
    ],
    ai: [
        "前沿模型公司",
        "大型科技与云平台",
        "中国大模型",
        "开源社区与论文",
        "评测、安全与治理"
    ]
};
const resourceTitlePriority = {
    journals: {
        "知网学术期刊库": 120,
        "知网高级检索": 119,
        "American Economic Review": 112,
        "Quarterly Journal of Economics": 111,
        "Journal of Political Economy": 110,
        Econometrica: 109,
        "Review of Economic Studies": 108,
        arXiv: 107,
        "NBER Working Papers": 106,
        "CEPR Discussion Papers": 105,
        "中国社会科学": 104,
        "经济研究": 103,
        "世界经济与政治": 102,
        "世界经济": 101,
        "管理世界": 100,
        "中国工业经济": 99,
        "经济学（季刊）": 98,
        "统计研究": 97,
        "哲学研究": 94,
        "国际问题研究": 93,
        "国际政治研究": 92,
        "国际安全研究": 91,
        "外交评论": 90,
        "当代亚太": 89,
        "历史研究": 88,
        "地理学报": 87
    },
    thinktanks: {
        "国务院发展研究中心": 120,
        "中国社会科学院": 118,
        "中国社会科学院国家国际战略研究院": 117,
        "中国现代国际关系研究院": 116,
        "中国国际问题研究院": 115,
        "中国国际经济交流中心": 114,
        "中国智库网": 112,
        CSIS: 110,
        "Brookings Institution": 109,
        "Chatham House": 108,
        "Council on Foreign Relations": 107,
        "Carnegie Endowment": 106,
        "RAND Corporation": 105,
        IISS: 104,
        "Stanford Freeman Spogli Institute": 100,
        "Harvard Fairbank Center for Chinese Studies": 99,
        "Oxford School of Global and Area Studies": 98,
        "SOAS University of London": 97,
        "北京大学国家发展研究院": 96,
        "北京大学区域与国别研究院": 95,
        "清华大学国情研究院": 94,
        "清华大学国际与地区研究院": 93,
        "Lowy Institute": 89,
        MERICS: 88,
        "Asia Research Institute, NUS": 87,
        "全球智库机构目录（CASISD）": 70
    },
    news: {
        Reuters: 130,
        "Associated Press": 129,
        "Agence France-Presse": 128,
        "Xinhua English": 127,
        "新华网": 126,
        "United Press International": 123,
        "TASS Russian News Agency": 122,
        Bloomberg: 119,
        "Financial Times": 118,
        "The Wall Street Journal": 116,
        "The Economist": 115,
        BBC: 114,
        "The New York Times": 113,
        "The Guardian": 111,
        CNN: 110,
        "Fox News": 109,
        "ABC News": 108,
        "CBS News": 107,
        "NBC News": 106,
        POLITICO: 105,
        "MS NOW": 104,
        "Al Jazeera": 109,
        "Deutsche Welle": 108,
        "France 24": 107,
        "NHK WORLD-JAPAN": 106,
        "Yonhap News Agency": 105,
        "RFI 中文": 104,
        "中央社": 103,
        "联合早报": 103,
        "Le Monde": 103,
        "El Pais": 102,
        NPR: 102,
        Nikkei: 101,
        "KBS WORLD": 100,
        "South China Morning Post": 100,
        "Chosun Ilbo": 99,
        "The Diplomat": 99,
        "JoongAng Ilbo": 98,
        "CBC News": 98,
        "The Korea Herald": 97,
        "ABC News Australia": 97,
        "The Korea Times": 96,
        "The Straits Times": 96,
        "The Dong-A Ilbo": 95,
        "Channel NewsAsia": 95,
        Hankyoreh: 94,
        "The Hindu": 94,
        MONTSAME: 93,
        "Al Arabiya English": 93,
        "Korean Central News Agency": 92,
        "The Economic Times": 92,
        "联合新闻网": 91,
        "公视新闻网": 90,
        "财新": 90,
        "Rodong Sinmun": 89,
        "人民网": 88,
        "央视新闻": 87,
        "NK News": 86,
        "中国新闻网": 86,
        "澎湃新闻": 84,
        "The UB Post": 83,
        "Bangkok Post": 80,
        "The Jakarta Post": 79,
        "The Star Malaysia": 78,
        "Daily Nation": 77,
        Malaysiakini: 77,
        "Mail & Guardian": 76,
        Rappler: 76,
        "Folha de S.Paulo": 75,
        GDELT: 70,
        Factiva: 69,
        "Nexis Uni": 68
    },
    governments: {
        "中国政府网": 130,
        "中华人民共和国外交部": 128,
        "国家统计局": 126,
        "美国白宫": 124,
        "U.S. Department of State": 123,
        "U.S. Department of Commerce": 122,
        "日本首相官邸": 120,
        "日本外务省": 119,
        "韩国总统府": 118,
        "韩国外交部": 117,
        "ASEAN Secretariat": 116,
        ASEANstats: 115,
        "GOV.UK": 114,
        "European Commission": 113,
        "United Nations": 112,
        "World Bank Data": 111,
        "IMF Data": 110
    },
    ai: {
        OpenAI: 130,
        Anthropic: 128,
        "Google DeepMind": 126,
        "Google AI": 125,
        "Meta AI": 124,
        "Microsoft AI Blog": 122,
        "Mistral AI": 121,
        xAI: 120,
        Cohere: 119,
        Perplexity: 117,
        "NVIDIA AI Blog": 116,
        "Amazon Science": 115,
        "IBM Research AI": 114,
        DeepSeek: 112,
        Qwen: 111,
        "Moonshot AI / Kimi": 110,
        "Zhipu AI": 109,
        "Tencent Hunyuan": 108,
        "Baidu Qianfan": 107,
        "Hugging Face": 105,
        arXiv: 104,
        "Papers with Code": 103,
        Arena: 102,
        METR: 101,
        "UK AI Security Institute": 100,
        "Stanford HAI": 99,
        "Epoch AI": 98
    }
};
let localDocuments = typeof window !== "undefined" && Array.isArray(window.LOCAL_DOCUMENTS)
    ? window.LOCAL_DOCUMENTS
    : [];
let localDocumentsMeta = typeof window !== "undefined" && window.LOCAL_DOCUMENTS_META
    ? window.LOCAL_DOCUMENTS_META
    : {};
const state = {
    mode: "journals",
    query: "",
    gasRegion: "全部地区",
    gasAccess: "全部访问条件",
    categoryFilters: {
        journals: "全部",
        thinktanks: "全部",
        news: "全部",
        governments: "全部",
        ai: "全部",
        documents: "全部",
        gas: "全部"
    },
    documentPath: "",
    starred: []
};
const els = {
    globalSearch: document.querySelector("#globalSearch"),
    weeklyPanel: document.querySelector("#weeklyPanel"),
    gasPanel: document.querySelector("#gasPanel"),
    gasGrid: document.querySelector("#gasGrid"),
    gasCount: document.querySelector("#gasCount"),
    gasRegion: document.querySelector("#gasRegion"),
    gasAccess: document.querySelector("#gasAccess"),
    modeTabs: document.querySelectorAll(".mode-tab"),
    resourceFiltersTitle: document.querySelector("#resourceFiltersTitle"),
    resourceCategoryList: document.querySelector("#resourceCategoryList"),
    modeControls: document.querySelectorAll("[data-mode-control]"),
    journalsPanel: document.querySelector("#journalsPanel"),
    thinkTankPanel: document.querySelector("#thinkTankPanel"),
    newsPanel: document.querySelector("#newsPanel"),
    governmentPanel: document.querySelector("#governmentPanel"),
    aiPanel: document.querySelector("#aiPanel"),
    documentsPanel: document.querySelector("#documentsPanel"),
    journalGrid: document.querySelector("#journalGrid"),
    journalCount: document.querySelector("#journalCount"),
    thinkTankGrid: document.querySelector("#thinkTankGrid"),
    newsGrid: document.querySelector("#newsGrid"),
    governmentGrid: document.querySelector("#governmentGrid"),
    aiGrid: document.querySelector("#aiGrid"),
    documentGrid: document.querySelector("#documentGrid"),
    documentSummary: document.querySelector("#documentSummary"),
    thinkTankCount: document.querySelector("#thinkTankCount"),
    newsCount: document.querySelector("#newsCount"),
    governmentCount: document.querySelector("#governmentCount"),
    aiCount: document.querySelector("#aiCount"),
    documentCount: document.querySelector("#documentCount")
};
const modePlaceholders = {
    weekly: "搜索本期标题、来源或地区",
    gas: "搜索机构、管道、LNG、船舶或国家",
    journals: "搜索期刊名称、学科、CNKI 代码",
    thinktanks: "搜索智库、地区或议题",
    news: "搜索新闻来源、地区或语言",
    governments: "搜索国家、部委、统计或政策网站",
    ai: "搜索AI机构、模型、公告或研究方向",
    documents: "搜索本地文献名、格式或路径"
};
const filterTitles = {
    gas: "项目资源分类",
    journals: "期刊分类",
    thinktanks: "智库分类",
    news: "新闻分类",
    governments: "政府分类",
    ai: "AI分类",
    documents: "文件夹"
};
const modePanels = [
    ["weekly", els.weeklyPanel],
    ["gas", els.gasPanel],
    ["journals", els.journalsPanel],
    ["thinktanks", els.thinkTankPanel],
    ["news", els.newsPanel],
    ["governments", els.governmentPanel],
    ["ai", els.aiPanel],
    ["documents", els.documentsPanel]
];
function loadState() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        for (const key of [...Object.keys(state), "journalCategory"]) {
            if (Object.hasOwn(stored, key))
                state[key] = stored[key];
        }
    }
    catch {
        // Ignore malformed local state.
    }
    state.categoryFilters = {
        journals: "全部",
        thinktanks: "全部",
        news: "全部",
        governments: "全部",
        ai: "全部",
        documents: "全部",
        gas: "全部",
        ...(state.categoryFilters || {})
    };
    Object.keys(state.categoryFilters).forEach((mode) => {
        if (!MODES.has(mode))
            delete state.categoryFilters[mode];
    });
    if (state.journalCategory && state.categoryFilters.journals === "全部") {
        state.categoryFilters.journals = state.journalCategory;
    }
    delete state.journalCategory;
    if (!MODES.has(state.mode)) {
        state.mode = "journals";
        state.query = "";
    }
    const linkedMode = window.location.hash.slice(1);
    if (MODES.has(linkedMode)) {
        state.mode = linkedMode;
        state.query = "";
    }
    if (!["全部地区", ...gasSources.map((item) => item.region)].includes(state.gasRegion))
        state.gasRegion = "全部地区";
    if (!["全部访问条件", ...gasSources.map((item) => item.access)].includes(state.gasAccess))
        state.gasAccess = "全部访问条件";
    if (["#briefing", "#aiSearch", "#data"].includes(window.location.hash)) {
        state.mode = "journals";
        state.query = "";
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    state.documentPath = normalizeDocumentPath(state.documentPath);
    state.starred = unique((Array.isArray(state.starred) ? state.starred : []).map((id) => id === "journals:https://www.webofscience.com/" ? "journals:https://webofscience.clarivate.cn/wos/woscc/basic-search" : id));
    validateCategoryFilter(state.mode);
    els.globalSearch.value = state.query;
}
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function normalize(value) {
    return String(value || "").trim().toLowerCase();
}
function splitTerms(value) {
    return normalize(value)
        .split(/[\s,，、;；/]+/)
        .map((term) => term.trim())
        .filter((term) => term.length >= 2);
}
function unique(values) {
    return [...new Set(values.filter(Boolean))];
}
function formatDateTime(value) {
    if (!value)
        return "未知";
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return String(value);
    return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}
function localDocumentApiUrl() {
}
function localDocumentOpenUrl(item) {
}
async function refreshLocalDocumentsFromServer() {
}
function modeItems(mode) {
    if (mode === "gas")
        return gasSources;
    if (mode === "journals")
        return journals;
    if (mode === "thinktanks")
        return thinkTanks;
    if (mode === "news")
        return newsSources;
    if (mode === "governments")
        return governmentSites;
    if (mode === "ai")
        return aiSources;
    if (mode === "documents")
        return localDocuments;
    return [];
}
function starIdForItem(item, mode) {
    const key = mode === "documents"
        ? item.path || item.relativePath || item.fileName || item.title
        : item.url || item.title;
    return `${mode}:${key}`;
}
function isStarred(item, mode) {
    return state.starred.includes(starIdForItem(item, mode));
}
function toggleStar(item, mode) {
    const id = starIdForItem(item, mode);
    state.starred = isStarred(item, mode)
        ? state.starred.filter((value) => value !== id)
        : unique([...state.starred, id]);
    saveState();
    render();
}
function starredCountForMode(mode) {
    return modeItems(mode).filter((item) => isStarred(item, mode)).length;
}
function documentPathParts(pathValue) {
    return String(pathValue || "")
        .split("/")
        .filter(Boolean);
}
function normalizeDocumentPath(pathValue) {
    return documentPathParts(pathValue).join("/");
}
function documentFolderPaths(item) {
    const parts = documentPathParts(documentFolder(item).path);
    return parts.map((_, index) => parts.slice(0, index + 1).join("/"));
}
function isDocumentInsidePath(item, pathValue) {
    const folderPath = normalizeDocumentPath(documentFolder(item).path);
    const currentPath = normalizeDocumentPath(pathValue);
    return !currentPath || folderPath === currentPath || folderPath.startsWith(`${currentPath}/`);
}
function isDirectDocumentInPath(item, pathValue) {
    return normalizeDocumentPath(documentFolder(item).path) === normalizeDocumentPath(pathValue);
}
function documentPathExists(pathValue) {
    const path = normalizeDocumentPath(pathValue);
    if (!path)
        return true;
    return localDocuments.some((item) => isDocumentInsidePath(item, path));
}
function activeDocumentPath() {
    const category = activeCategory("documents");
    if (category === STAR_FILTER)
        return normalizeDocumentPath(state.documentPath);
    if (category !== "全部")
        return normalizeDocumentPath(category);
    return normalizeDocumentPath(state.documentPath);
}
function validateDocumentPath() {
    if (activeCategory("documents") === STAR_FILTER)
        return;
    const path = activeDocumentPath();
    if (!documentPathExists(path)) {
        state.documentPath = "";
        state.categoryFilters.documents = "全部";
        saveState();
        return;
    }
    state.documentPath = path;
    state.categoryFilters.documents = path || "全部";
}
function setDocumentPath(pathValue) {
    const path = normalizeDocumentPath(pathValue);
    state.documentPath = path;
    state.categoryFilters.documents = path || "全部";
    saveState();
    renderResourceFilters();
    renderLocalDocuments();
}
function countItemsForCategory(items, mode, category) {
    if (category === "全部")
        return items.length;
    if (category === STAR_FILTER)
        return starredCountForMode(mode);
    if (mode === "documents") {
        return items.filter((item) => isDocumentInsidePath(item, category)).length;
    }
    return items.filter((item) => itemCategoryForMode(item, mode) === category).length;
}
function itemCategoryForMode(item, mode) {
    if (mode === "documents") {
        return documentFolder(item).path || "阅读下载文献";
    }
    return item.category || "其他";
}
function categoryRankForMode(mode, category) {
    const order = resourceCategoryOrder[mode] || [];
    const index = order.indexOf(category);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
function compareCategoriesForMode(mode, a, b) {
    if (mode === "documents") {
        if (a === "阅读下载文献")
            return -1;
        if (b === "阅读下载文献")
            return 1;
    }
    const rank = categoryRankForMode(mode, a) - categoryRankForMode(mode, b);
    return rank || a.localeCompare(b, "zh-CN");
}
function itemPriorityForMode(item, mode) {
    const explicitPriority = Number(item.priority);
    if (Number.isFinite(explicitPriority))
        return explicitPriority;
    return resourceTitlePriority[mode]?.[item.title] || 0;
}
function compareResourceItems(a, b, mode) {
    const starred = Number(isStarred(b, mode)) - Number(isStarred(a, mode));
    if (starred)
        return starred;
    const priority = itemPriorityForMode(b, mode) - itemPriorityForMode(a, mode);
    if (priority)
        return priority;
    const category = compareCategoriesForMode(mode, itemCategoryForMode(a, mode), itemCategoryForMode(b, mode));
    return category || a.title.localeCompare(b.title, "zh-CN");
}
function categoriesForMode(mode) {
    const values = mode === "documents"
        ? unique(modeItems(mode).flatMap((item) => documentFolderPaths(item)))
        : unique(modeItems(mode).map((item) => itemCategoryForMode(item, mode)));
    const sorted = values.sort((a, b) => compareCategoriesForMode(mode, a, b));
    return ["全部", ...sorted, STAR_FILTER];
}
function activeCategory(mode = state.mode) {
    return state.categoryFilters?.[mode] || "全部";
}
function validateCategoryFilter(mode) {
    const categories = categoriesForMode(mode);
    if (!categories.includes(activeCategory(mode))) {
        state.categoryFilters[mode] = "全部";
    }
}
function itemText(item) {
    return normalize([
        item.title,
        item.category,
        item.level,
        item.access,
        item.coverage,
        item.url,
        item.path,
        item.relativePath,
        item.fileName,
        item.extension,
        item.modified,
        item.sizeText,
        item.rssUrl,
        item.rssLabel,
        item.description,
        ...(item.aliases || []),
        ...(item.tags || []),
        ...(item.actions || []).map((action) => `${action.label} ${action.url}`),
        ...(item.indicators || []).map((indicator) => `${indicator.name} ${indicator.code} ${(indicator.tags || []).join(" ")}`)
    ].join(" "));
}
function resourceDetailForItem(item, mode) {
    const detailParts = [];
    if (mode === "news" && item.aliases?.length) {
        detailParts.push(`常用中文名：${item.aliases.join(" / ")}`);
    }
    if (mode === "ai" && item.aliases?.length) {
        detailParts.push(`常用名：${item.aliases.join(" / ")}`);
    }
    if (item.detail)
        detailParts.push(item.detail);
    return detailParts.join("；");
}
function switchMode(mode) {
    if (!MODES.has(mode))
        return;
    if (state.mode !== mode) {
        state.query = "";
        els.globalSearch.value = "";
    }
    state.mode = mode;
    history.replaceState(null, "", `#${mode}`);
    saveState();
    render();
}
function render() {
    renderMode();
    renderResourceFilters();
    renderJournals();
    renderThinkTanks();
    renderNewsSources();
    renderGovernmentSites();
    renderAiSources();
    renderGasSources();
    renderLocalDocuments();
}
function renderMode() {
    els.modeTabs.forEach((button) => {
        const isActive = button.dataset.mode === state.mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    modePanels.forEach(([mode, panel]) => {
        panel.hidden = state.mode !== mode;
    });
    els.modeControls.forEach((control) => {
        const modes = (control.dataset.modeControl || "").split(/\s+/);
        control.hidden = !(modes.includes("all") || modes.includes(state.mode));
    });
    els.globalSearch.placeholder = modePlaceholders[state.mode] || "搜索全部资源";
    window.WeeklyReports?.setContext({ active: state.mode === "weekly", query: state.query });
}
function renderResourceFilters() {
    validateCategoryFilter(state.mode);
    if (state.mode === "documents")
        validateDocumentPath();
    const categories = categoriesForMode(state.mode);
    const items = modeItems(state.mode);
    const selected = state.mode === "documents"
        ? activeCategory("documents") === STAR_FILTER
            ? STAR_FILTER
            : activeDocumentPath() || "全部"
        : activeCategory();
    els.resourceFiltersTitle.textContent = filterTitles[state.mode] || "资源分类";
    els.resourceCategoryList.replaceChildren();
    categories.forEach((category) => {
        const count = countItemsForCategory(items, state.mode, category);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `chip${selected === category ? " is-active" : ""}`;
        button.innerHTML = "<span></span><small></small>";
        button.querySelector("span").textContent = category;
        button.querySelector("small").textContent = count;
        button.addEventListener("click", () => {
            if (state.mode === "documents") {
                if (category === STAR_FILTER) {
                    state.categoryFilters.documents = STAR_FILTER;
                    saveState();
                    renderResourceFilters();
                    renderLocalDocuments();
                    return;
                }
                setDocumentPath(category === "全部" ? "" : category);
                return;
            }
            state.categoryFilters[state.mode] = category;
            saveState();
            render();
        });
        els.resourceCategoryList.append(button);
    });
}
function filteredJournals() {
    const terms = splitTerms(state.query);
    const category = activeCategory("journals");
    return journals
        .filter((journal) => category === STAR_FILTER ? isStarred(journal, "journals") : category === "全部" || journal.category === category)
        .filter((journal) => !terms.length || terms.some((term) => itemText(journal).includes(term)))
        .sort((a, b) => compareResourceItems(a, b, "journals"));
}
function createStarButton(item, mode) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "star-button";
    const renderState = () => {
        const active = isStarred(item, mode);
        button.classList.toggle("is-starred", active);
        button.textContent = active ? "★" : "☆";
        button.title = active ? "取消星标" : "加入星标";
        button.setAttribute("aria-label", active ? "取消星标" : "加入星标");
        button.setAttribute("aria-pressed", String(active));
    };
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleStar(item, mode);
    });
    renderState();
    return button;
}
function createResourceCard({ category, title, description, detail, meta, tags = [], url, linkText = "打开", actions = [], starItem, starMode }) {
    const card = document.createElement("article");
    card.className = "resource-card";
    card.innerHTML = `
    <div class="card-top">
      <span class="category-pill"></span>
      <div class="card-actions">
        <a class="open-link main-link" target="_blank" rel="noreferrer">打开</a>
      </div>
    </div>
    <h3></h3>
    <p></p>
    <div class="source-detail" hidden></div>
    <div class="meta-row"><span></span></div>
    <div class="tag-row"></div>
  `;
    card.querySelector(".category-pill").textContent = category || "资源";
    card.querySelector("h3").textContent = title || "未命名资源";
    card.querySelector("p").textContent = description || "";
    card.querySelector(".meta-row span").textContent = meta || "";
    renderTags(card.querySelector(".tag-row"), tags);
    const detailEl = card.querySelector(".source-detail");
    if (detail) {
        detailEl.textContent = detail;
        detailEl.hidden = false;
    }
    const mainLink = card.querySelector(".main-link");
    mainLink.href = url;
    mainLink.textContent = linkText;
    const actionsEl = card.querySelector(".card-actions");
    if (starItem && starMode) {
        actionsEl.insertBefore(createStarButton(starItem, starMode), mainLink);
        if (starMode !== "documents" && window.AICollection) {
            actionsEl.insertBefore(window.AICollection.createButton({ title, url, mode: starMode }), mainLink);
        }
    }
    actions.forEach((action) => {
        const link = document.createElement("a");
        link.className = `open-link ${action.className || ""}`.trim();
        link.target = "_blank";
        link.rel = "noreferrer";
        link.href = action.url;
        link.textContent = action.label;
        actionsEl.insertBefore(link, mainLink);
    });
    return card;
}
function renderJournals() {
    const results = filteredJournals();
    els.journalCount.textContent = results.length;
    els.journalGrid.replaceChildren();
    if (!results.length) {
        els.journalGrid.append(emptyState("没有匹配的期刊。试试减少关键词或切换分类。"));
        return;
    }
    results.forEach((journal) => {
        els.journalGrid.append(createResourceCard({
            category: journal.category,
            title: journal.title,
            description: journal.description,
            meta: journal.cnkiCode ? `${journal.level} · CNKI ${journal.cnkiCode}` : journal.level,
            tags: journal.tags,
            url: journal.url,
            starItem: journal,
            starMode: "journals",
            linkText: (journal.tags || []).includes("知网") ? "知网" : "打开",
            actions: [
                ...(journal.actions || []),
                ...(journal.rssUrl
                    ? [{ label: journal.rssLabel || "RSS", url: journal.rssUrl, className: "rss-link" }]
                    : [])
            ]
        }));
    });
}
function filteredDirectoryItems(items, mode) {
    const terms = splitTerms(state.query);
    const category = activeCategory(mode);
    return items
        .filter((item) => (category === STAR_FILTER ? isStarred(item, mode) : category === "全部" || itemCategoryForMode(item, mode) === category))
        .filter((item) => !terms.length || terms.some((term) => itemText(item).includes(term)))
        .sort((a, b) => compareResourceItems(a, b, mode));
}
function filteredLocalDocuments() {
    const terms = splitTerms(state.query);
    const starredOnly = activeCategory("documents") === STAR_FILTER;
    const currentPath = starredOnly ? "" : activeDocumentPath();
    return localDocuments
        .filter((item) => (starredOnly ? isStarred(item, "documents") : isDocumentInsidePath(item, currentPath)))
        .filter((item) => !terms.length || terms.some((term) => itemText(item).includes(term)))
        .sort((a, b) => {
        const starred = Number(isStarred(b, "documents")) - Number(isStarred(a, "documents"));
        if (starred)
            return starred;
        const modified = String(b.modified || "").localeCompare(String(a.modified || ""));
        const folder = documentFolder(a).path.localeCompare(documentFolder(b).path, "zh-CN");
        return folder || modified || a.title.localeCompare(b.title, "zh-CN");
    });
}
function childFoldersForPath(items, pathValue) {
    const currentPath = normalizeDocumentPath(pathValue);
    const folders = new Map();
    items.forEach((item) => {
        const folderPath = normalizeDocumentPath(documentFolder(item).path);
        if (folderPath === currentPath)
            return;
        if (currentPath && !folderPath.startsWith(`${currentPath}/`))
            return;
        const remainder = currentPath ? folderPath.slice(currentPath.length + 1) : folderPath;
        const childName = documentPathParts(remainder)[0];
        if (!childName)
            return;
        const childPath = currentPath ? `${currentPath}/${childName}` : childName;
        if (!folders.has(childPath)) {
            folders.set(childPath, {
                name: childName,
                path: childPath,
                fileCount: 0,
                directFileCount: 0,
                modified: ""
            });
        }
        const folder = folders.get(childPath);
        folder.fileCount += 1;
        if (folderPath === childPath)
            folder.directFileCount += 1;
        if (String(item.modified || "") > String(folder.modified || ""))
            folder.modified = item.modified || "";
    });
    return [...folders.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}
function directDocumentsForPath(items, pathValue) {
    return items
        .filter((item) => isDirectDocumentInPath(item, pathValue))
        .sort((a, b) => Number(isStarred(b, "documents")) - Number(isStarred(a, "documents")) ||
        String(b.modified || "").localeCompare(String(a.modified || "")) ||
        a.title.localeCompare(b.title, "zh-CN"));
}
function documentFolder(item) {
    const relativePath = item.relativePath || item.fileName || "";
    const parts = relativePath.split("/").filter(Boolean);
    const fileName = parts.pop() || item.fileName || item.title || "未命名文件";
    const pathParts = parts;
    const folderPath = pathParts.join("/");
    return {
        name: pathParts.at(-1) || "阅读下载文献",
        path: folderPath,
        displayPath: folderPath || localDocumentsMeta.sourceDir || "本机文献",
        fileName
    };
}
function groupedLocalDocuments(items) {
    const groups = new Map();
    items.forEach((item) => {
        const folder = documentFolder(item);
        const key = folder.path || "__root__";
        if (!groups.has(key)) {
            groups.set(key, { ...folder, items: [] });
        }
        groups.get(key).items.push(item);
    });
    return [...groups.values()].sort((a, b) => {
        if (!a.path && b.path)
            return -1;
        if (a.path && !b.path)
            return 1;
        return a.path.localeCompare(b.path, "zh-CN");
    });
}
function documentDisplayPath(pathValue) {
}
function documentFolderTitle(pathValue) {
    return documentPathParts(pathValue).at(-1) || "阅读下载文献";
}
function createDocumentBreadcrumb(pathValue) {
    const currentPath = normalizeDocumentPath(pathValue);
    const parts = documentPathParts(currentPath);
    const nav = document.createElement("nav");
    nav.className = "document-breadcrumb";
    nav.setAttribute("aria-label", "本地文献路径");
    const appendButton = (label, path) => {
        const normalizedPath = normalizeDocumentPath(path);
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.disabled = normalizedPath === currentPath;
        button.addEventListener("click", () => setDocumentPath(normalizedPath));
        nav.append(button);
    };
    appendButton("阅读下载文献", "");
    parts.forEach((part, index) => {
        const separator = document.createElement("span");
        separator.textContent = "/";
        nav.append(separator);
        appendButton(part, parts.slice(0, index + 1).join("/"));
    });
    return nav;
}
function createFileRow(item) {
}
function createFolderSection(folders) {
    const section = document.createElement("section");
    section.className = "folder-section";
    section.innerHTML = `
    <div class="folder-head">
      <div>
        <h3>文件夹</h3>
        <p>点击进入下一级目录。</p>
      </div>
      <span class="folder-count"></span>
    </div>
    <div class="folder-card-grid"></div>
  `;
    section.querySelector(".folder-count").textContent = `${folders.length} 个文件夹`;
    const grid = section.querySelector(".folder-card-grid");
    folders.forEach((folder) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "folder-card";
        button.innerHTML = "<strong></strong><span></span><small></small>";
        button.querySelector("strong").textContent = folder.name;
        button.querySelector("span").textContent = `${folder.fileCount} 个文件${folder.directFileCount ? ` · 本层 ${folder.directFileCount}` : ""}`;
        button.querySelector("small").textContent = folder.modified ? `最近更新 ${folder.modified}` : folder.path;
        button.addEventListener("click", () => setDocumentPath(folder.path));
        grid.append(button);
    });
    return section;
}
function createFilesSection(files, currentPath, titleText = documentFolderTitle(currentPath), descriptionText = documentDisplayPath(currentPath)) {
    const section = document.createElement("section");
    section.className = "folder-section";
    section.innerHTML = `
    <div class="folder-head">
      <div>
        <h3></h3>
        <p></p>
      </div>
      <span class="folder-count"></span>
    </div>
    <div class="file-list"></div>
  `;
    section.querySelector("h3").textContent = titleText;
    section.querySelector("p").textContent = descriptionText;
    section.querySelector(".folder-count").textContent = `${files.length} 个文件`;
    const list = section.querySelector(".file-list");
    files.forEach((item) => {
        list.append(createFileRow(item));
    });
    return section;
}
function renderLocalDocuments() {
}
function renderDirectoryCards(items, grid, countEl, emptyText, mode) {
    countEl.textContent = items.length;
    grid.replaceChildren();
    if (!items.length) {
        grid.append(emptyState(emptyText));
        return;
    }
    items.forEach((item) => {
        grid.append(createResourceCard({
            category: item.category,
            title: item.title,
            description: item.description,
            meta: item.level,
            tags: (item.tags || []).slice(0, 7),
            url: item.url,
            linkText: item.linkText || "打开",
            actions: item.actions || [],
            detail: resourceDetailForItem(item, mode),
            starItem: item,
            starMode: mode
        }));
    });
}
function renderThinkTanks() {
    renderDirectoryCards(filteredDirectoryItems(thinkTanks, "thinktanks"), els.thinkTankGrid, els.thinkTankCount, "没有匹配的智库。试试搜索“国际关系”“经济”“中国研究”“安全”等关键词。", "thinktanks");
}
function renderNewsSources() {
    renderDirectoryCards(filteredDirectoryItems(newsSources, "news"), els.newsGrid, els.newsCount, "没有匹配的新闻来源。试试搜索国家、地区或来源名称，例如“中国大陆”“东南亚”“美国”“通讯社”。", "news");
}
function renderGovernmentSites() {
    renderDirectoryCards(filteredDirectoryItems(governmentSites, "governments"), els.governmentGrid, els.governmentCount, "没有匹配的政府网站。试试搜索“外交”“统计”“商务”“东盟”“韩国”“美国”等关键词。", "governments");
}
function renderAiSources() {
    renderDirectoryCards(filteredDirectoryItems(aiSources, "ai"), els.aiGrid, els.aiCount, "没有匹配的 AI 发声平台。试试搜索“OpenAI”“Claude”“Qwen”“安全”“评测”“开源”等关键词。", "ai");
}
function renderTags(container, tags) {
    container.replaceChildren();
    (tags || []).forEach((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        container.append(span);
    });
}
function renderGasSources() {
    els.gasRegion.value = state.gasRegion;
    els.gasAccess.value = state.gasAccess;
    const results = filteredDirectoryItems(gasSources, "gas")
        .filter((item) => state.gasRegion === "全部地区" || item.region === state.gasRegion)
        .filter((item) => state.gasAccess === "全部访问条件" || item.access === state.gasAccess);
    renderDirectoryCards(results, els.gasGrid, els.gasCount, "没有匹配的网站，请调整关键词、分类、地区或访问条件。", "gas");
}
function emptyState(text) {
    const div = document.createElement("div");
    div.className = "empty-state";
    div.textContent = text;
    return div;
}
function bindEvents() {
    for (const [key, values] of [
        ["gasRegion", ["全部地区", ...unique(gasSources.map((item) => item.region))]],
        ["gasAccess", ["全部访问条件", "公开为主", "部分订阅", "订阅为主"]]
    ]) {
        els[key].replaceChildren(...values.map((value) => new Option(value, value)));
        els[key].addEventListener("change", () => {
            state[key] = els[key].value;
            saveState();
            renderGasSources();
        });
    }
    els.modeTabs.forEach((button) => {
        button.addEventListener("click", () => switchMode(button.dataset.mode));
    });
    els.globalSearch.addEventListener("input", (event) => {
        state.query = event.target.value;
        saveState();
        renderJournals();
        renderThinkTanks();
        renderNewsSources();
        renderGovernmentSites();
        renderAiSources();
        renderGasSources();
        renderLocalDocuments();
        window.WeeklyReports?.setContext({ active: state.mode === "weekly", query: state.query });
    });
}
loadState();
bindEvents();
render();
;
;
window.addEventListener("hashchange", () => {
    const mode = window.location.hash.slice(1);
    if (MODES.has(mode))
        switchMode(mode);
});
