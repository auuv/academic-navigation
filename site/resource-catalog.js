(function (root, factory) {
  const catalog = factory();
  if (typeof module === "object" && module.exports) module.exports = catalog;
  else root.ResourceCatalog = catalog;
})(typeof globalThis === "object" ? globalThis : this, function () {
  // Shared by the directory and collection service; keep resource identities in one place.
  const CNKI_JOURNAL_HOME = "https://kns.cnki.net/kns8?dbcode=CJFQ";
const CNKI_ADVANCED_SEARCH = "https://kns.cnki.net/kns8/AdvSearch";

function cnkiJournalPage(code) {
  return `https://navi.cnki.net/knavi/journals/${code}/detail`;
}

function cnkiRss(code) {
  return `https://rss.cnki.net/knavi/rss/${code}?pcode=CJFD,CCJD`;
}

const journals = [
  {
    title: "Web of Science / WoS",
    category: "检索入口与工作论文",
    url: "https://webofscience.clarivate.cn/wos/woscc/basic-search",
    level: "引文数据库 / 机构订阅",
    priority: 122,
    aliases: ["WoS", "WOS", "Web of Science", "WebofScience", "科睿唯安", "Clarivate", "Web of Science 核心合集", "Web of Science Core Collection", "JCR", "Journal Citation Reports", "期刊引证报告"],
    tags: ["英文", "学术检索", "论文", "引文", "作者", "跨学科", "SCI", "SCIE", "SSCI", "JCR", "期刊分类", "机构订阅"],
    description: "科睿唯安的学术文献与引文检索平台，可查询论文、引用关系和作者记录；主入口使用 Web of Science 中国站，附 JCR 期刊分类入口。访问取决于机构订阅，全文访问取决于出版平台权限。",
    actions: [{ label: "JCR 分类", url: "https://jcr.clarivate.com/jcr/browse-categories" }]
  },
  {
    title: "Google Scholar / 谷歌学术",
    category: "检索入口与工作论文",
    url: "https://scholar.google.com/",
    level: "学术搜索",
    priority: 121,
    aliases: ["Google Scholar", "谷歌学术", "Google学术", "谷歌學術"],
    tags: ["中文", "英文", "学术检索", "论文", "引文", "作者", "跨学科"],
    description: "跨学科学术文献搜索入口，可检索论文、图书、学位论文及引用关系；全文访问取决于出版平台和机构权限。"
  },
  {
    title: "PNAS / 美国国家科学院院刊",
    category: "综合科学",
    url: "https://www.pnas.org/",
    level: "综合科学期刊",
    aliases: ["Proceedings of the National Academy of Sciences"],
    tags: ["英文", "综合科学", "社会科学", "经济学", "劳动市场", "美国政府经济学家"],
    description: "综合性同行评审期刊，涵盖自然科学和社会科学，可检索经济学、人口与劳动市场等跨学科研究。"
  },
  {
    title: "Monthly Labor Review / 劳工月评",
    category: "应用经济",
    url: "https://www.bls.gov/mlr/",
    level: "BLS 研究刊物 / 开放",
    aliases: ["MLR", "美国劳工统计局月刊"],
    tags: ["英文", "劳动经济学", "就业", "工资", "价格", "统计方法", "美国政府经济学家"],
    description: "美国劳工统计局的研究刊物，发布劳动市场、工资、价格、生产率和统计测量方面的分析。"
  },
  {
    title: "AEA JOE / 经济学家招聘",
    category: "学术组织与职业",
    url: "https://www.aeaweb.org/joe/",
    level: "学会 / 招聘平台",
    aliases: ["American Economic Association", "美国经济学会", "Job Openings for Economists", "JOE Network", "Allied Social Science Associations", "Allied Social Sciences Association", "ASSA"],
    tags: ["英文", "经济学", "博士就业", "政府经济学家", "招聘", "学术会议", "美国政府经济学家"],
    description: "美国经济学会的经济学家招聘平台，涵盖大学、政府与研究机构职位；附学会官网和 ASSA 年会入口。",
    actions: [
      { label: "学会官网", url: "https://www.aeaweb.org/" },
      { label: "ASSA年会", url: "https://www.aeaweb.org/conference/" }
    ]
  },
  {
    title: "Society of Labor Economists / 劳动经济学会",
    category: "学术组织与职业",
    url: "https://www.sole-jole.org/",
    level: "学会 / 学术会议",
    aliases: ["SOLE", "劳动经济学家学会"],
    tags: ["英文", "劳动经济学", "就业", "工资", "学术会议", "美国政府经济学家"],
    description: "劳动经济学专业学会，提供年会、学术活动和相关研究交流信息。"
  },
  {
    title: "Joint Statistical Meetings / 联合统计会议",
    category: "学术组织与职业",
    url: "https://www.amstat.org/meetings/joint-statistical-meetings",
    level: "统计学会议",
    aliases: ["JSM", "美国统计学会联合统计会议"],
    tags: ["英文", "统计学", "调查方法", "官方统计", "学术会议", "美国政府经济学家"],
    description: "联合统计会议官方入口，可查询会议安排和统计方法、调查研究及数据科学相关学术交流信息。"
  },
  {
    title: "知网学术期刊库",
    category: "检索入口与工作论文",
    url: CNKI_JOURNAL_HOME,
    level: "CNKI",
    tags: ["中文", "期刊文章", "知网", "全文", "核心期刊"],
    description: "中国学术期刊网络出版总库入口，适合检索中文期刊文章、核心期刊和刊期内容。"
  },
  {
    title: "知网高级检索",
    category: "检索入口与工作论文",
    url: CNKI_ADVANCED_SEARCH,
    level: "CNKI",
    tags: ["中文", "高级检索", "主题", "篇名", "作者", "文献来源"],
    description: "适合按主题、篇名、作者、关键词、摘要、文献来源等字段精确检索中文期刊文章。"
  },
  {
    title: "arXiv",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/",
    level: "预印本 / Open Access",
    aliases: ["arxiv", "开放预印本"],
    tags: ["英文", "预印本", "开放获取", "工作论文", "主题分类", "RSS"],
    description: "开放获取预印本平台，适合追踪尚未正式发表的论文、工作论文和跨学科新成果。",
    actions: [
      { label: "搜索", url: "https://arxiv.org/search/" },
      { label: "高级搜索", url: "https://arxiv.org/search/advanced" },
      { label: "分类表", url: "https://arxiv.org/category_taxonomy" }
    ]
  },
  {
    title: "arXiv Economics",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/list/econ/recent",
    level: "预印本 / 经济学",
    aliases: ["arXiv 经济学", "econ"],
    tags: ["英文", "预印本", "经济学", "计量经济学", "理论经济", "应用经济"],
    description: "arXiv 经济学新论文入口，覆盖计量经济学、一般经济学和理论经济学，适合补充工作论文追踪。",
    actions: [
      { label: "计量经济", url: "https://arxiv.org/list/econ.EM/recent" },
      { label: "一般经济", url: "https://arxiv.org/list/econ.GN/recent" },
      { label: "理论经济", url: "https://arxiv.org/list/econ.TH/recent" }
    ]
  },
  {
    title: "arXiv Quantitative Finance",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/list/q-fin/recent",
    level: "预印本 / 定量金融",
    aliases: ["arXiv 定量金融", "q-fin"],
    tags: ["英文", "预印本", "定量金融", "风险管理", "资产定价", "统计金融"],
    description: "arXiv 定量金融新论文入口，适合追踪金融工程、资产定价、风险管理和市场微观结构研究。",
    actions: [
      { label: "风险管理", url: "https://arxiv.org/list/q-fin.RM/recent" },
      { label: "证券定价", url: "https://arxiv.org/list/q-fin.PR/recent" },
      { label: "统计金融", url: "https://arxiv.org/list/q-fin.ST/recent" }
    ]
  },
  {
    title: "arXiv Statistics & Machine Learning",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/list/stat/recent",
    level: "预印本 / 统计与机器学习",
    aliases: ["arXiv 统计", "stat", "stat.ML"],
    tags: ["英文", "预印本", "统计", "机器学习", "计量方法", "因果推断"],
    description: "arXiv 统计学新论文入口，适合追踪统计方法、应用统计、机器学习和计量方法前沿。",
    actions: [
      { label: "机器学习", url: "https://arxiv.org/list/stat.ML/recent" },
      { label: "方法论", url: "https://arxiv.org/list/stat.ME/recent" },
      { label: "应用统计", url: "https://arxiv.org/list/stat.AP/recent" }
    ]
  },
  {
    title: "arXiv AI & Computer Science",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/list/cs.AI/recent",
    level: "预印本 / AI与计算机",
    aliases: ["arXiv AI", "cs.AI", "cs.LG"],
    tags: ["英文", "预印本", "人工智能", "机器学习", "NLP", "计算机视觉", "计算社会科学"],
    description: "arXiv 人工智能与计算机科学入口，适合追踪 AI、机器学习、语言模型、计算机视觉和计算社会科学。",
    actions: [
      { label: "机器学习", url: "https://arxiv.org/list/cs.LG/recent" },
      { label: "语言计算", url: "https://arxiv.org/list/cs.CL/recent" },
      { label: "计算机视觉", url: "https://arxiv.org/list/cs.CV/recent" },
      { label: "计算社会", url: "https://arxiv.org/list/cs.CY/recent" }
    ]
  },
  {
    title: "arXiv Social & Information Networks",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/list/cs.SI/recent",
    level: "预印本 / 社会网络",
    aliases: ["arXiv 社会信息网络", "cs.SI"],
    tags: ["英文", "预印本", "社会网络", "信息网络", "平台", "计算社会科学"],
    description: "社会与信息网络主题入口，适合追踪平台、社交网络、信息扩散、网络结构和计算社会科学研究。"
  },
  {
    title: "arXiv Mathematics & Methods",
    category: "检索入口与工作论文",
    url: "https://arxiv.org/list/math/recent",
    level: "预印本 / 数学方法",
    aliases: ["arXiv 数学", "math"],
    tags: ["英文", "预印本", "数学", "优化", "概率", "统计理论", "PDE"],
    description: "arXiv 数学新论文入口，适合追踪优化、概率、统计理论、分析和数学方法类论文。",
    actions: [
      { label: "优化控制", url: "https://arxiv.org/list/math.OC/recent" },
      { label: "概率", url: "https://arxiv.org/list/math.PR/recent" },
      { label: "统计理论", url: "https://arxiv.org/list/math.ST/recent" },
      { label: "PDE", url: "https://arxiv.org/list/math.AP/recent" }
    ]
  },
  {
    title: "American Economic Review",
    category: "经济学综合",
    url: "https://www.aeaweb.org/journals/aer",
    rssUrl: "https://www.aeaweb.org/research/rss-feed",
    rssLabel: "AEA RSS",
    level: "Top",
    tags: ["经济学", "综合", "实证", "理论"],
    description: "经济学综合顶刊，适合宏观、微观、发展、政治经济学等高质量研究；订阅源使用 AEA 研究动态。"
  },
  {
    title: "Quarterly Journal of Economics",
    category: "经济学综合",
    url: "https://academic.oup.com/qje",
    rssUrl: "https://academic.oup.com/rss/site_5504/3365.xml",
    level: "Top",
    tags: ["经济学", "发展", "政治经济学", "劳动"],
    description: "经济学顶刊，重视问题意识、识别策略和机制解释。"
  },
  {
    title: "Journal of Political Economy",
    category: "经济学综合",
    url: "https://www.journals.uchicago.edu/journals/jpe/about",
    rssUrl: "https://www.journals.uchicago.edu/action/showFeed?type=etoc&feed=rss&jc=jpe",
    level: "Top",
    tags: ["经济学", "理论", "产业", "政治经济学"],
    description: "经济学顶刊，理论和结构化实证研究都很强。"
  },
  {
    title: "Econometrica",
    category: "经济学综合",
    url: "https://www.econometricsociety.org/publications/econometrica",
    rssUrl: "https://onlinelibrary.wiley.com/feed/14680262/most-recent",
    level: "Top",
    tags: ["计量", "经济理论", "方法"],
    description: "计量经济学与经济理论顶级期刊。"
  },
  {
    title: "Review of Economic Studies",
    category: "经济学综合",
    url: "https://academic.oup.com/restud",
    rssUrl: "https://academic.oup.com/rss/site_5508/3369.xml",
    level: "Top",
    tags: ["经济学", "理论", "实证", "宏观", "微观"],
    description: "经济学 Top 5 期刊之一，覆盖理论、实证、宏观、微观和政治经济学等方向。"
  },
  {
    title: "Review of Economics and Statistics",
    category: "应用经济",
    url: "https://direct.mit.edu/rest",
    level: "Leading",
    tags: ["应用经济", "因果推断", "政策评估"],
    description: "应用经济学和政策评估常用目标期刊。"
  },
  {
    title: "The Economic Journal",
    category: "经济学综合",
    url: "https://academic.oup.com/ej",
    rssUrl: "https://academic.oup.com/rss/site_6182/4014.xml",
    level: "Leading",
    tags: ["经济学", "综合", "应用经济", "理论"],
    description: "英国皇家经济学会期刊，覆盖经济学理论、实证和政策研究。"
  },
  {
    title: "International Economic Review",
    category: "经济学综合",
    url: "https://onlinelibrary.wiley.com/journal/14682354",
    rssUrl: "https://onlinelibrary.wiley.com/feed/14682354/most-recent",
    level: "Leading",
    tags: ["经济学", "综合", "理论", "实证"],
    description: "经济学综合性重要期刊，发表理论、计量、宏观、微观和国际经济研究。"
  },
  {
    title: "Journal of the European Economic Association",
    category: "经济学综合",
    url: "https://academic.oup.com/jeea",
    rssUrl: "https://academic.oup.com/rss/site_5571/3427.xml",
    level: "Leading",
    tags: ["经济学", "欧洲", "综合", "实证", "理论"],
    description: "欧洲经济学会旗舰期刊，覆盖经济学各主要领域的前沿研究。"
  },
  {
    title: "The RAND Journal of Economics",
    category: "产业组织与应用微观",
    url: "https://onlinelibrary.wiley.com/journal/17562171",
    rssUrl: "https://onlinelibrary.wiley.com/feed/17562171/most-recent",
    level: "Leading",
    tags: ["产业组织", "微观", "规制", "市场结构"],
    description: "产业组织、规制经济学和应用微观理论的重要期刊。"
  },
  {
    title: "Journal of Development Economics",
    category: "发展与区域",
    url: "https://www.sciencedirect.com/journal/journal-of-development-economics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/03043878",
    level: "Leading",
    tags: ["发展经济学", "制度", "贫困", "贸易"],
    description: "发展经济学核心期刊，适合国家、地区与制度议题。"
  },
  {
    title: "Journal of International Economics",
    category: "国际经济与贸易",
    url: "https://www.sciencedirect.com/journal/journal-of-international-economics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/00221996",
    level: "Leading",
    tags: ["国际经济", "贸易", "汇率", "开放经济"],
    description: "国际贸易、国际金融和开放宏观经济学重要期刊。"
  },
  {
    title: "Journal of Public Economics",
    category: "公共经济",
    url: "https://www.sciencedirect.com/journal/journal-of-public-economics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/00472727",
    level: "Leading",
    tags: ["公共经济", "财政", "税收", "政策评估"],
    description: "公共经济学、财政、税收、福利政策和政策评估研究重要期刊。"
  },
  {
    title: "Journal of Monetary Economics",
    category: "宏观与金融",
    url: "https://www.sciencedirect.com/journal/journal-of-monetary-economics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/03043932",
    level: "Leading",
    tags: ["宏观", "货币", "金融", "中央银行"],
    description: "货币经济学、宏观经济学和金融宏观研究重要期刊。"
  },
  {
    title: "Journal of Econometrics",
    category: "计量与方法",
    url: "https://www.sciencedirect.com/journal/journal-of-econometrics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/03044076",
    level: "Leading",
    tags: ["计量", "方法", "统计", "因果推断"],
    description: "计量经济学理论、方法和应用计量研究核心期刊。"
  },
  {
    title: "Journal of Finance",
    category: "金融学",
    url: "https://onlinelibrary.wiley.com/journal/15406261",
    rssUrl: "https://onlinelibrary.wiley.com/feed/15406261/most-recent",
    level: "Top",
    tags: ["金融", "资产定价", "公司金融", "市场"],
    description: "金融学顶级期刊，覆盖资产定价、公司金融、市场微观结构和金融中介等方向。"
  },
  {
    title: "Journal of Financial Economics",
    category: "金融学",
    url: "https://www.sciencedirect.com/journal/journal-of-financial-economics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/0304405X",
    level: "Top",
    tags: ["金融", "公司金融", "资产定价", "治理"],
    description: "金融经济学顶级期刊，适合公司金融、资产定价、并购、治理和资本市场研究。"
  },
  {
    title: "The Review of Financial Studies",
    category: "金融学",
    url: "https://academic.oup.com/rfs",
    rssUrl: "https://academic.oup.com/rss/site_5511/3372.xml",
    level: "Top",
    tags: ["金融", "资产定价", "公司金融", "风险"],
    description: "金融学顶级期刊之一，覆盖资产定价、公司金融、风险管理和金融市场。"
  },
  {
    title: "Journal of Financial and Quantitative Analysis",
    category: "金融学",
    url: "https://www.cambridge.org/core/journals/journal-of-financial-and-quantitative-analysis",
    rssUrl: "https://www.cambridge.org/core/rss/product/id/FB35548FF614F4556E96D01FA2CB412E",
    level: "Leading",
    tags: ["金融", "数量金融", "公司金融", "资产定价"],
    description: "金融学重要期刊，强调数量分析、公司金融、资产定价和金融市场研究。"
  },
  {
    title: "Review of Finance",
    category: "金融学",
    url: "https://academic.oup.com/rof",
    rssUrl: "https://academic.oup.com/rss/site_5510/3371.xml",
    level: "Leading",
    tags: ["金融", "欧洲金融", "公司金融", "资产定价"],
    description: "欧洲金融协会期刊，覆盖公司金融、资产定价、金融机构和市场研究。"
  },
  {
    title: "Journal of Accounting and Economics",
    category: "会计学",
    url: "https://www.sciencedirect.com/journal/journal-of-accounting-and-economics",
    rssUrl: "https://rss.sciencedirect.com/publication/science/01654101",
    level: "Top",
    tags: ["会计", "财务报告", "公司治理", "资本市场"],
    description: "会计学顶级期刊，侧重会计信息、资本市场、公司治理和契约理论。"
  },
  {
    title: "Journal of Accounting Research",
    category: "会计学",
    url: "https://onlinelibrary.wiley.com/journal/1475679x",
    rssUrl: "https://onlinelibrary.wiley.com/feed/1475679x/most-recent",
    level: "Top",
    tags: ["会计", "审计", "信息披露", "资本市场"],
    description: "会计学顶级期刊，覆盖财务会计、审计、信息披露和资本市场研究。"
  },
  {
    title: "The Accounting Review",
    category: "会计学",
    url: "https://publications.aaahq.org/accounting-review",
    level: "Top",
    tags: ["会计", "审计", "披露", "治理"],
    description: "美国会计学会旗舰期刊，发表财务会计、管理会计、审计和税务等方向研究。"
  },
  {
    title: "Contemporary Accounting Research",
    category: "会计学",
    url: "https://onlinelibrary.wiley.com/journal/19113846",
    rssUrl: "https://onlinelibrary.wiley.com/feed/19113846/most-recent",
    level: "Leading",
    tags: ["会计", "公司治理", "信息披露", "审计"],
    description: "会计学重要期刊，覆盖财务会计、审计、治理和资本市场等主题。"
  },
  {
    title: "Review of Accounting Studies",
    category: "会计学",
    url: "https://link.springer.com/journal/11142",
    level: "Leading",
    tags: ["会计", "信息披露", "公司治理", "实证"],
    description: "会计学重要期刊，侧重实证会计、信息披露、公司治理和资本市场研究。"
  },
  {
    title: "World Development",
    category: "发展与区域",
    url: "https://www.sciencedirect.com/journal/world-development",
    level: "Leading",
    tags: ["发展", "全球南方", "治理", "政策"],
    description: "发展研究、国际发展政策和区域研究的重要期刊。"
  },
  {
    title: "Regional Studies",
    category: "发展与区域",
    url: "https://www.tandfonline.com/journals/cres20",
    level: "Leading",
    tags: ["区域经济", "城市", "创新", "韧性"],
    description: "区域经济、城市和空间发展研究常用期刊。"
  },
  {
    title: "Journal of Regional Science",
    category: "发展与区域",
    url: "https://rsaiconnect.onlinelibrary.wiley.com/journal/14679787",
    level: "Field",
    tags: ["区域科学", "空间计量", "城市"],
    description: "区域科学和空间经济分析期刊。"
  },
  {
    title: "The China Quarterly",
    category: "中国与区域国别",
    url: "https://www.cambridge.org/core/journals/china-quarterly",
    level: "Leading",
    tags: ["中国研究", "政治", "社会", "区域国别"],
    description: "国际中国研究核心期刊，政治、社会、经济和历史议题均覆盖。"
  },
  {
    title: "Journal of Contemporary China",
    category: "中国与区域国别",
    url: "https://www.tandfonline.com/journals/cjcc20",
    level: "Leading",
    tags: ["中国研究", "政策", "国际关系", "政治经济"],
    description: "当代中国政治、经济、外交和社会研究的重要期刊。"
  },
  {
    title: "Modern Asian Studies",
    category: "中国与区域国别",
    url: "https://www.cambridge.org/core/journals/modern-asian-studies",
    level: "Leading",
    tags: ["亚洲研究", "历史", "人类学", "区域国别"],
    description: "亚洲区域研究经典期刊，适合跨学科区域研究。"
  },
  {
    title: "Pacific Affairs",
    category: "中国与区域国别",
    url: "https://pacificaffairs.ubc.ca/",
    level: "Field",
    tags: ["亚太", "区域国别", "国际关系"],
    description: "亚太政治经济、国际关系和区域研究期刊。"
  },
  {
    title: "Asian Survey",
    category: "中国与区域国别",
    url: "https://online.ucpress.edu/as",
    level: "Field",
    tags: ["亚洲", "政治", "区域国别"],
    description: "亚洲各国政治经济动态和区域比较研究。"
  },
  {
    title: "International Organization",
    category: "政治学、国际关系与区域国别",
    url: "https://www.cambridge.org/core/journals/international-organization",
    level: "Top",
    tags: ["国际关系", "政治经济", "制度", "贸易"],
    description: "国际关系和国际政治经济学顶级期刊。"
  },
  {
    title: "World Politics",
    category: "政治学、国际关系与区域国别",
    url: "https://www.cambridge.org/core/journals/world-politics",
    level: "Top",
    tags: ["比较政治", "国际关系", "制度"],
    description: "比较政治、国际关系和政治发展研究的重要期刊。"
  },
  {
    title: "Comparative Political Studies",
    category: "政治学、国际关系与区域国别",
    url: "https://journals.sagepub.com/home/cps",
    level: "Leading",
    tags: ["比较政治", "制度", "民主", "治理"],
    description: "比较政治学核心期刊，适合跨国制度、治理和政治行为研究。"
  },
  {
    title: "International Security",
    category: "政治学、国际关系与区域国别",
    url: "https://direct.mit.edu/isec",
    level: "Leading",
    tags: ["安全研究", "战略", "国际关系"],
    description: "安全研究、战略研究和国际冲突研究核心期刊。"
  },
  {
    title: "Governance",
    category: "政治学、国际关系与区域国别",
    url: "https://onlinelibrary.wiley.com/journal/14680491",
    level: "Leading",
    tags: ["治理", "公共政策", "制度"],
    description: "治理、公共管理、制度和政策过程研究。"
  },
  {
    title: "American Sociological Review",
    category: "社会学与人类学",
    url: "https://journals.sagepub.com/home/asr",
    level: "Top",
    tags: ["社会学", "不平等", "组织", "方法"],
    description: "社会学综合顶刊，适合理论和严谨实证研究。"
  },
  {
    title: "American Journal of Sociology",
    category: "社会学与人类学",
    url: "https://www.journals.uchicago.edu/journals/ajs/about",
    level: "Top",
    tags: ["社会学", "历史社会学", "组织"],
    description: "社会学顶刊，理论、历史和经验研究兼具。"
  },
  {
    title: "Current Anthropology",
    category: "社会学与人类学",
    url: "https://www.journals.uchicago.edu/journals/ca/about",
    level: "Leading",
    tags: ["人类学", "民族志", "田野调查"],
    description: "人类学综合期刊，适合民族志、方法和理论议题。"
  },
  {
    title: "American Anthropologist",
    category: "社会学与人类学",
    url: "https://anthrosource.onlinelibrary.wiley.com/journal/15481433",
    level: "Leading",
    tags: ["人类学", "民族志", "文化"],
    description: "美国人类学会旗舰期刊。"
  },
  {
    title: "Global Environmental Change",
    category: "环境与能源",
    url: "https://www.sciencedirect.com/journal/global-environmental-change",
    level: "Leading",
    tags: ["环境", "气候", "治理", "韧性"],
    description: "全球环境变化、气候治理和社会经济影响研究。"
  },
  {
    title: "Energy Economics",
    category: "环境与能源",
    url: "https://www.sciencedirect.com/journal/energy-economics",
    level: "Leading",
    tags: ["能源", "碳排放", "经济学", "政策"],
    description: "能源经济、碳排放、能源政策和市场研究。"
  },
  {
    title: "Ecological Economics",
    category: "环境与能源",
    url: "https://www.sciencedirect.com/journal/ecological-economics",
    level: "Leading",
    tags: ["生态经济", "可持续", "环境政策"],
    description: "生态经济学、可持续发展和环境治理期刊。"
  },
  {
    title: "Journal of Cleaner Production",
    category: "环境与能源",
    url: "https://www.sciencedirect.com/journal/journal-of-cleaner-production",
    level: "Leading",
    tags: ["绿色创新", "低碳", "企业", "产业"],
    description: "绿色生产、低碳转型和企业环境管理常用期刊。"
  },
  {
    title: "Research Policy",
    category: "创新与管理",
    url: "https://www.sciencedirect.com/journal/research-policy",
    level: "Leading",
    tags: ["创新", "技术", "政策", "专利"],
    description: "创新研究、科技政策和产业技术变迁核心期刊。"
  },
  {
    title: "Technological Forecasting and Social Change",
    category: "创新与管理",
    url: "https://www.sciencedirect.com/journal/technological-forecasting-and-social-change",
    level: "Field",
    tags: ["技术变迁", "数字化", "创新"],
    description: "技术预测、社会变迁、数字化和创新扩散研究。"
  },
  {
    title: "NBER Working Papers",
    category: "检索入口与工作论文",
    url: "https://www.nber.org/papers",
    level: "Working Papers",
    tags: ["经济学", "工作论文", "NBER", "宏观", "劳动", "公共", "发展"],
    description: "美国国家经济研究局工作论文入口，适合跟踪经济学前沿论文和研究项目。"
  },
  {
    title: "CEPR Discussion Papers",
    category: "检索入口与工作论文",
    url: "https://cepr.org/publications/discussion-papers/search-discussion-papers",
    level: "Discussion Papers",
    tags: ["经济学", "工作论文", "CEPR", "欧洲", "贸易", "宏观", "政治经济"],
    description: "CEPR 讨论论文库入口，适合按主题、作者、JEL 和研究方向查找经济学工作论文。"
  },
  {
    title: "管理世界",
    category: "经济学与管理",
    url: cnkiJournalPage("GLSJ"),
    rssUrl: cnkiRss("GLSJ"),
    level: "CSSCI",
    cnkiCode: "GLSJ",
    tags: ["管理", "经济", "中文", "政策", "知网"],
    description: "中文管理学和应用经济研究重要期刊；点击进入知网该刊详情页。"
  },
  {
    title: "经济研究",
    category: "经济学综合",
    url: cnkiJournalPage("JJYJ"),
    rssUrl: cnkiRss("JJYJ"),
    level: "CSSCI",
    cnkiCode: "JJYJ",
    tags: ["经济学", "中文", "实证", "知网"],
    description: "中文经济学代表性期刊；点击进入知网该刊详情页。"
  },
  {
    title: "世界经济",
    category: "国际经济与贸易",
    url: cnkiJournalPage("SJJJ"),
    rssUrl: cnkiRss("SJJJ"),
    level: "CSSCI",
    cnkiCode: "SJJJ",
    tags: ["世界经济", "国际贸易", "宏观", "中文", "知网"],
    description: "国际经济、世界经济、贸易和开放经济研究重要中文期刊；点击进入知网该刊详情页。"
  },
  {
    title: "经济学（季刊）",
    category: "经济学综合",
    url: cnkiJournalPage("JJXU"),
    rssUrl: cnkiRss("JJXU"),
    level: "CSSCI",
    cnkiCode: "JJXU",
    tags: ["经济学", "季刊", "实证", "理论", "中文", "知网"],
    description: "经济学综合研究期刊，重视理论、经验研究和方法规范；点击进入知网该刊详情页。"
  },
  {
    title: "中国工业经济",
    category: "产业组织与应用微观",
    url: cnkiJournalPage("GGYY"),
    rssUrl: cnkiRss("GGYY"),
    level: "CSSCI",
    cnkiCode: "GGYY",
    tags: ["产业经济", "企业", "工业经济", "创新", "中文", "知网"],
    description: "产业经济、企业行为、工业发展和中国经济研究重要期刊；点击进入知网该刊详情页。"
  },
  {
    title: "统计研究",
    category: "计量与方法",
    url: cnkiJournalPage("TJYJ"),
    level: "CSSCI",
    cnkiCode: "TJYJ",
    tags: ["统计", "计量", "方法", "数据", "中文", "知网"],
    description: "统计理论、统计方法和应用统计研究重要期刊；点击进入知网该刊详情页。"
  },
  {
    title: "中国社会科学",
    category: "哲学与综合社科",
    url: cnkiJournalPage("ZSHK"),
    rssUrl: cnkiRss("ZSHK"),
    level: "CSSCI",
    cnkiCode: "ZSHK",
    tags: ["社科", "中文", "理论", "知网"],
    description: "综合社会科学代表性中文期刊；点击进入知网该刊详情页。"
  },
  {
    title: "哲学研究",
    category: "哲学与综合社科",
    url: cnkiJournalPage("ZXYJ"),
    level: "CSSCI",
    cnkiCode: "ZXYJ",
    tags: ["哲学", "理论", "中文", "知网"],
    description: "哲学领域代表性中文期刊，覆盖马克思主义哲学、中国哲学、西方哲学等方向；点击进入知网该刊详情页。"
  },
  {
    title: "世界经济与政治",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("SJJZ"),
    level: "CSSCI",
    cnkiCode: "SJJZ",
    tags: ["国际关系", "政治经济", "中文", "知网"],
    description: "国际政治经济学和世界政治研究中文核心期刊；点击进入知网该刊详情页。"
  },
  {
    title: "国际问题研究",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("GJWY"),
    level: "CSSCI",
    cnkiCode: "GJWY",
    tags: ["国际关系", "外交", "中文", "知网"],
    description: "国际问题、外交政策与区域研究中文期刊；点击进入知网该刊详情页。"
  },
  {
    title: "国际政治研究",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("GJZY"),
    level: "CSSCI",
    cnkiCode: "GJZY",
    tags: ["国际政治", "国际关系", "比较政治", "中文", "知网"],
    description: "国际政治与国际关系研究期刊，适合理论、区域和比较研究；点击进入知网该刊详情页。"
  },
  {
    title: "国际安全研究",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("GGXB"),
    level: "CSSCI",
    cnkiCode: "GGXB",
    tags: ["国际安全", "安全研究", "战略", "中文", "知网"],
    description: "国际安全、战略与国家安全治理研究期刊；点击进入知网该刊详情页。"
  },
  {
    title: "外交评论",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("WJXY"),
    level: "CSSCI",
    cnkiCode: "WJXY",
    tags: ["外交", "国际关系", "国际政治", "中文", "知网"],
    description: "外交学院主办的国际关系与外交研究期刊；点击进入知网该刊详情页。"
  },
  {
    title: "当代亚太",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("DDYT"),
    level: "CSSCI",
    cnkiCode: "DDYT",
    tags: ["亚太", "国际关系", "区域国别", "中文", "知网"],
    description: "亚太地区政治、经济、国际关系与区域合作研究重要期刊；点击进入知网该刊详情页。"
  },
  {
    title: "东北亚论坛",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("DBYL"),
    level: "CSSCI",
    cnkiCode: "DBYL",
    tags: ["东北亚", "区域国别", "国际关系", "中文", "知网"],
    description: "东北亚区域研究、国际政治经济和区域合作研究期刊；点击进入知网该刊详情页。"
  },
  {
    title: "东南亚研究",
    category: "东南亚与ASEAN研究",
    url: cnkiJournalPage("DNYY"),
    level: "CSSCI",
    cnkiCode: "DNYY",
    tags: ["东南亚", "区域国别", "中文", "知网"],
    description: "东南亚区域国别研究重要中文期刊；点击进入知网该刊详情页。"
  },
  {
    title: "南洋问题研究",
    category: "东南亚与ASEAN研究",
    url: cnkiJournalPage("LYWT"),
    level: "CSSCI",
    cnkiCode: "LYWT",
    tags: ["东南亚", "南洋", "华侨华人", "区域国别", "中文", "知网"],
    description: "东南亚、南洋问题与华侨华人研究期刊；点击进入知网该刊详情页。"
  },
  {
    title: "Journal of Southeast Asian Studies",
    category: "东南亚与ASEAN研究",
    url: "https://www.cambridge.org/core/journals/journal-of-southeast-asian-studies",
    level: "Leading",
    tags: ["东南亚", "区域研究", "历史", "政治", "社会", "人类学"],
    description: "东南亚研究经典英文期刊，覆盖东南亚历史、人类学、政治、社会与区域研究。"
  },
  {
    title: "Contemporary Southeast Asia",
    category: "东南亚与ASEAN研究",
    url: "https://bookshop.iseas.edu.sg/journal-details/cs",
    level: "SSCI / Q1",
    tags: ["东南亚", "国际关系", "安全", "政治经济", "ASEAN", "区域架构"],
    description: "ISEAS 旗舰期刊，聚焦东南亚国内政治、区域架构、安全、战略与国际关系。"
  },
  {
    title: "Journal of Current Southeast Asian Affairs",
    category: "东南亚与ASEAN研究",
    url: "https://journals.sagepub.com/home/saa",
    level: "Open Access",
    tags: ["东南亚", "政治", "国际关系", "社会", "开放获取"],
    description: "开放获取期刊，关注东南亚当前政治发展、国际关系、社会经济与法律议题。"
  },
  {
    title: "Southeast Asian Studies",
    category: "东南亚与ASEAN研究",
    url: "https://englishkyoto-seas.org/",
    level: "Field",
    tags: ["东南亚", "区域研究", "跨学科", "京都大学", "开放获取"],
    description: "京都大学东南亚地域研究所英文期刊，强调跨学科、经验研究和区域研究。"
  },
  {
    title: "美国研究",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("MGYJ"),
    level: "CSSCI",
    cnkiCode: "MGYJ",
    tags: ["美国研究", "区域国别", "国际关系", "中文", "知网"],
    description: "美国政治、经济、社会、外交和中美关系研究期刊；点击进入知网该刊详情页。"
  },
  {
    title: "区域国别学刊",
    category: "政治学、国际关系与区域国别",
    url: cnkiJournalPage("QYQQ"),
    level: "CSSCI",
    cnkiCode: "QYQQ",
    tags: ["区域国别", "跨学科", "国际关系", "中文", "知网"],
    description: "区域国别研究专业期刊，适合跨学科地区研究和国别研究；点击进入知网该刊详情页。"
  },
  {
    title: "地理学报",
    category: "地理、空间与区域",
    url: cnkiJournalPage("DLXB"),
    level: "CSSCI / CSCD",
    cnkiCode: "DLXB",
    tags: ["地理", "空间", "区域", "城市", "中文", "知网"],
    description: "地理学综合代表性期刊，覆盖自然地理、人文地理和区域研究；点击进入知网该刊详情页。"
  },
  {
    title: "地理研究",
    category: "地理、空间与区域",
    url: cnkiJournalPage("DLYJ"),
    level: "CSSCI / CSCD",
    cnkiCode: "DLYJ",
    tags: ["地理", "城市", "区域", "空间", "中文", "知网"],
    description: "地理学与区域空间研究重要期刊，适合城市、区域和空间分析研究；点击进入知网该刊详情页。"
  },
  {
    title: "世界地理研究",
    category: "地理、空间与区域",
    url: cnkiJournalPage("SJDJ"),
    level: "北大核心 / CSSCI扩展",
    cnkiCode: "SJDJ",
    tags: ["世界地理", "区域", "地缘", "城市", "中文", "知网"],
    description: "世界地理、区域发展、地缘环境和国际区域研究期刊；点击进入知网该刊详情页。"
  },
  {
    title: "历史研究",
    category: "历史与人类学",
    url: cnkiJournalPage("LSYJ"),
    level: "CSSCI",
    cnkiCode: "LSYJ",
    tags: ["历史", "史学", "中文", "知网"],
    description: "历史学综合代表性期刊，适合中国史、世界史和史学理论研究；点击进入知网该刊详情页。"
  },
  {
    title: "近代史研究",
    category: "历史与人类学",
    url: cnkiJournalPage("JDSY"),
    level: "CSSCI",
    cnkiCode: "JDSY",
    tags: ["近代史", "中国史", "历史", "中文", "知网"],
    description: "中国近代史专业期刊，聚焦 1840-1949 年中国历史研究；点击进入知网该刊详情页。"
  },
  {
    title: "清史研究",
    category: "历史与人类学",
    url: cnkiJournalPage("QSYJ"),
    level: "CSSCI",
    cnkiCode: "QSYJ",
    tags: ["清史", "明清史", "历史", "中文", "知网"],
    description: "清史与明清史研究专业期刊；点击进入知网该刊详情页。"
  },
  {
    title: "民俗研究",
    category: "历史与人类学",
    url: cnkiJournalPage("MSYA"),
    level: "CSSCI",
    cnkiCode: "MSYA",
    tags: ["民俗", "人类学", "非遗", "民间文学", "中文", "知网"],
    description: "民俗学、民间文学、非遗和礼俗社会研究重要期刊；点击进入知网该刊详情页。"
  }
];

const dataSources = [
  {
    title: "Census Restricted-Use Data / 受限微观数据",
    category: "微观数据与研究申请",
    url: "https://www.census.gov/topics/research/guidance/restricted-use-microdata.html",
    access: "需申请审批 / 安全环境使用 / 成果披露审查",
    aliases: ["美国人口普查局受限数据", "restricted-use microdata", "限制使用微观数据"],
    coverage: "人口、家庭和企业调查、经济普查、雇主与雇员匹配数据及行政记录的受限数据目录；不能直接公开下载。",
    tags: ["美国", "微观数据", "行政记录", "劳动经济学", "企业", "家庭", "美国政府经济学家"],
    priority: 8,
    indicators: [
      { name: "人口、家庭与企业微观记录", code: "Census restricted-use data", tags: ["微观数据", "人口", "家庭", "企业"] },
      { name: "雇主与雇员匹配数据及行政记录", code: "Linked employer-employee data", tags: ["就业", "工资", "行政记录"] }
    ],
    actions: [
      { label: "申请流程", url: "https://www.census.gov/topics/research/guidance/restricted-use-microdata/standard-application-process.html" }
    ]
  },
  {
    title: "FSRDC / 联邦统计研究数据中心",
    category: "微观数据与研究申请",
    url: "https://www.census.gov/about/adrm/fsrdc.html",
    access: "需项目及研究者资格审批 / 受保护环境访问",
    aliases: ["Federal Statistical Research Data Centers", "Federal Statistical Research Data Center", "RDC"],
    coverage: "联邦统计机构与研究机构合作的数据研究网络，提供受限数据安全研究环境、中心联系信息和申请指引；不是公开下载库。",
    tags: ["美国", "受限数据", "研究申请", "微观数据", "行政记录", "安全研究环境", "美国政府经济学家"],
    priority: 7,
    indicators: [
      { name: "研究数据中心与受限数据访问申请", code: "FSRDC network", tags: ["研究申请", "受限数据", "微观数据"] }
    ],
    actions: [
      { label: "申请流程", url: "https://www.census.gov/topics/research/guidance/restricted-use-microdata/standard-application-process.html" }
    ]
  },
  {
    title: "中国知网学术期刊库",
    category: "中文期刊文章",
    url: CNKI_JOURNAL_HOME,
    access: "机构订阅常见",
    coverage: "中文期刊文章、核心期刊、CSSCI/C刊、刊期浏览和文献来源检索",
    tags: ["中文", "知网", "期刊", "期刊文章", "CSSCI", "C刊", "文献", "综述"],
    priority: 11,
    indicators: [
      { name: "中文期刊文章", code: "CNKI CJFQ", tags: ["中文", "知网", "期刊文章"] },
      { name: "文献来源 / 核心期刊筛选", code: "CNKI Advanced Search", tags: ["CSSCI", "C刊", "文献"] }
    ]
  },
  {
    title: "中国知网高级检索",
    category: "中文期刊文章",
    url: CNKI_ADVANCED_SEARCH,
    access: "机构订阅常见",
    coverage: "按主题、篇名、作者、关键词、摘要、基金、文献来源等字段检索中文学术文章",
    tags: ["中文", "知网", "高级检索", "期刊文章", "作者", "关键词", "文献来源"],
    priority: 10,
    indicators: [
      { name: "主题/篇名/作者/关键词检索", code: "SU/TI/AU/KY", tags: ["中文", "知网", "高级检索"] }
    ]
  },
  {
    title: "World Bank Data / WDI",
    category: "国家宏观",
    url: "https://data.worldbank.org/",
    access: "开放",
    coverage: "国家-年份，长期序列，宏观发展、人口、环境、数字化指标",
    tags: ["国家", "跨国", "宏观", "人口", "GDP", "数字经济", "环境", "能源", "碳"],
    priority: 10,
    indicators: [
      { name: "GDP current US$", code: "NY.GDP.MKTP.CD", tags: ["GDP", "宏观"] },
      { name: "Population total", code: "SP.POP.TOTL", tags: ["人口"] },
      { name: "Individuals using the Internet", code: "IT.NET.USER.ZS", tags: ["数字经济", "互联网"] },
      { name: "CO2 emissions", code: "EN.ATM.CO2E.KT", tags: ["碳", "环境"] }
    ]
  },
  {
    title: "ASEANstats Data Portal",
    category: "东南亚与ASEAN数据",
    url: "https://data.aseanstats.org/",
    access: "开放",
    coverage: "ASEAN 官方统计门户，覆盖东盟成员国社会、经济、环境、贸易、FDI、旅游和 SDG 指标",
    tags: ["东南亚", "ASEAN", "东盟", "国家", "贸易", "FDI", "旅游", "SDG", "宏观"],
    priority: 11,
    indicators: [
      { name: "ASEAN Key Statistics", code: "ASEANstats", tags: ["东南亚", "ASEAN", "宏观"] },
      { name: "FDI / IMTS / SITS / Visitor Arrival", code: "ASEANstats categories", tags: ["FDI", "贸易", "旅游"] }
    ]
  },
  {
    title: "ASEAN Secretariat",
    category: "东南亚与ASEAN数据",
    url: "https://asean.org/",
    access: "开放",
    coverage: "ASEAN 官方文件、声明、会议、法律文件、统计入口和区域合作专题",
    tags: ["东南亚", "ASEAN", "东盟", "区域合作", "政策", "文件", "声明"],
    priority: 10,
    indicators: [
      { name: "ASEAN statements / legal documents", code: "ASEAN resources", tags: ["政策", "文件", "区域合作"] }
    ]
  },
  {
    title: "ADB Data Library",
    category: "东南亚与ASEAN数据",
    url: "https://data.adb.org/",
    access: "开放",
    coverage: "亚洲开发银行公开数据，含东南亚国家宏观、贫困、基础设施、项目和区域合作数据",
    tags: ["东南亚", "亚洲开发银行", "ADB", "国家", "宏观", "发展", "基础设施", "项目"],
    priority: 9,
    indicators: [
      { name: "Key Indicators for Asia and the Pacific", code: "ADB KI", tags: ["国家", "宏观", "发展"] },
      { name: "ADB project-level data", code: "ADB projects", tags: ["项目", "基础设施"] }
    ]
  },
  {
    title: "ADB Southeast Asia",
    category: "东南亚与ASEAN数据",
    url: "https://www.adb.org/where-we-work/southeast-asia",
    access: "开放",
    coverage: "ADB 东南亚地区专题页，适合查东南亚宏观展望、项目、国别资料和发展议题",
    tags: ["东南亚", "ADB", "发展", "国别", "项目", "宏观", "基础设施"],
    priority: 8,
    indicators: [
      { name: "Southeast Asia regional overview", code: "ADB SEA", tags: ["东南亚", "发展", "国别"] }
    ]
  },
  {
    title: "IMF Data",
    category: "国家宏观",
    url: "https://www.imf.org/en/Data",
    access: "开放",
    coverage: "宏观经济、金融、国际收支、财政、WEO 等国家数据",
    tags: ["国家", "跨国", "宏观", "金融", "财政", "国际收支"],
    priority: 9,
    indicators: [
      { name: "GDP growth / inflation / current account", code: "IMF data portal", tags: ["宏观", "金融"] },
      { name: "World Economic Outlook variables", code: "WEO", tags: ["国家", "宏观"] }
    ]
  },
  {
    title: "OECD Data",
    category: "国家宏观",
    url: "https://data.oecd.org/",
    access: "开放",
    coverage: "OECD 及部分伙伴经济体，创新、教育、贸易、生产率和政策数据",
    tags: ["国家", "OECD", "创新", "教育", "贸易", "生产率"],
    priority: 7,
    indicators: [
      { name: "R&D expenditure", code: "OECD MSTI", tags: ["创新"] },
      { name: "Trade in value added", code: "TiVA", tags: ["贸易", "价值链"] }
    ]
  },
  {
    title: "UN Comtrade",
    category: "贸易数据",
    url: "https://comtradeplus.un.org/",
    access: "开放/限额",
    coverage: "国家间商品贸易，HS/SITC 分类，适合出口、进口、RCEP 和贸易转移研究",
    tags: ["贸易", "出口", "进口", "RCEP", "国家", "双边"],
    priority: 9,
    indicators: [
      { name: "Bilateral export/import value", code: "HS/SITC by reporter-partner-year", tags: ["贸易", "出口", "进口"] }
    ]
  },
  {
    title: "CEPII Gravity / BACI",
    category: "贸易数据",
    url: "https://www.cepii.fr/CEPII/en/bdd_modele/bdd_modele.asp",
    access: "开放",
    coverage: "引力模型变量、距离、共同语言、殖民关系、BACI 清洗贸易数据",
    tags: ["贸易", "引力模型", "双边", "RCEP", "距离"],
    priority: 8,
    indicators: [
      { name: "Gravity controls", code: "Distance, contiguity, language", tags: ["贸易", "引力模型"] },
      { name: "BACI trade flows", code: "HS product-country-year", tags: ["贸易", "出口"] }
    ]
  },
  {
    title: "WTO Stats",
    category: "贸易数据",
    url: "https://stats.wto.org/",
    access: "开放",
    coverage: "国际贸易、关税、服务贸易和 WTO 统计指标",
    tags: ["贸易", "关税", "服务贸易", "国家"],
    priority: 6,
    indicators: [
      { name: "Merchandise trade / tariffs", code: "WTO Stats", tags: ["贸易", "关税"] }
    ]
  },
  {
    title: "V-Dem Dataset",
    category: "制度与治理",
    url: "https://v-dem.net/data/the-v-dem-dataset/",
    access: "开放",
    coverage: "国家-年份民主、制度、治理与政治变量，含最新版数据和代码本",
    tags: ["国家", "跨国", "政治", "治理", "制度", "民主", "AI治理"],
    priority: 8,
    indicators: [
      { name: "Liberal democracy index", code: "v2x_libdem", tags: ["民主", "制度"] },
      { name: "Electoral democracy index", code: "v2x_polyarchy", tags: ["民主", "政治"] }
    ]
  },
  {
    title: "Worldwide Governance Indicators",
    category: "制度与治理",
    url: "https://www.worldbank.org/en/publication/worldwide-governance-indicators",
    access: "开放",
    coverage: "国家治理质量，法治、腐败控制、政府有效性等",
    tags: ["国家", "治理", "制度", "法治", "腐败"],
    priority: 7,
    indicators: [
      { name: "Rule of Law", code: "RL.EST", tags: ["法治", "制度"] },
      { name: "Government Effectiveness", code: "GE.EST", tags: ["治理"] }
    ]
  },
  {
    title: "Quality of Government Dataset",
    category: "制度与治理",
    url: "https://www.gu.se/en/quality-government/qog-data",
    access: "开放",
    coverage: "整合制度、治理、政治经济和社会指标的跨国数据集",
    tags: ["国家", "跨国", "治理", "制度", "政治"],
    priority: 6,
    indicators: [
      { name: "Cross-national governance variables", code: "QoG Standard", tags: ["治理", "制度"] }
    ]
  },
  {
    title: "国家统计局数据",
    category: "中国宏观与区域",
    url: "https://data.stats.gov.cn/",
    access: "开放",
    coverage: "中国国家、省级、部分城市年度统计数据",
    tags: ["中国", "省级", "城市", "宏观", "人口", "产业", "数字经济"],
    priority: 10,
    indicators: [
      { name: "地区生产总值", code: "省/市年度统计", tags: ["GDP", "省级", "城市"] },
      { name: "产业结构、人口、固定资产投资", code: "国家统计局", tags: ["宏观", "产业", "人口"] }
    ]
  },
  {
    title: "中国城市统计年鉴 / 省市统计年鉴",
    category: "中国宏观与区域",
    url: "https://data.cnki.net/yearBook",
    access: "机构订阅常见",
    coverage: "地级市、省级面板，经济、人口、财政、环境、基础设施变量",
    tags: ["中国", "城市", "省级", "地级市", "基础设施", "环境"],
    priority: 9,
    indicators: [
      { name: "城市 GDP、人口、财政、工业、互联网", code: "城市统计年鉴", tags: ["城市", "数字经济", "宏观"] },
      { name: "废水、废气、污染治理", code: "环境统计年鉴", tags: ["环境", "污染"] }
    ]
  },
  {
    title: "EPS 数据平台",
    category: "中国宏观与区域",
    url: "https://www.epsnet.com.cn/",
    access: "机构订阅",
    coverage: "中国区域、行业、贸易、宏观和社会经济数据库整合平台",
    tags: ["中国", "省级", "城市", "行业", "贸易", "宏观"],
    priority: 7,
    indicators: [
      { name: "区域经济、行业经济、贸易数据", code: "EPS datasets", tags: ["中国", "城市", "贸易"] }
    ]
  },
  {
    title: "CEIC China Premium Database",
    category: "中国宏观与区域",
    url: "https://www.ceicdata.com/en",
    access: "订阅",
    coverage: "中国宏观、行业、省市、金融和高频数据",
    tags: ["中国", "省级", "城市", "宏观", "金融", "高频"],
    priority: 6,
    indicators: [
      { name: "China macro and regional indicators", code: "CEIC", tags: ["中国", "宏观", "城市"] }
    ]
  },
  {
    title: "CSMAR",
    category: "企业与金融",
    url: "https://www.gtarsc.com/",
    access: "机构订阅",
    coverage: "中国上市公司、财务、治理、股票、基金、ESG 和文本数据",
    tags: ["中国", "企业", "上市公司", "A股", "金融", "ESG", "创新"],
    priority: 10,
    indicators: [
      { name: "上市公司财务与治理", code: "CSMAR firm-year", tags: ["企业", "上市公司"] },
      { name: "绿色专利、ESG、年报文本", code: "CSMAR extensions", tags: ["ESG", "创新", "绿色创新"] }
    ]
  },
  {
    title: "Wind / 万得",
    category: "企业与金融",
    url: "https://www.wind.com.cn/",
    access: "订阅",
    coverage: "中国金融市场、上市公司、债券、基金、宏观和行业数据",
    tags: ["中国", "金融", "上市公司", "债券", "宏观"],
    priority: 8,
    indicators: [
      { name: "A 股行情、财务、债券、行业", code: "Wind terminal", tags: ["金融", "上市公司"] }
    ]
  },
  {
    title: "CNRDS",
    category: "企业与金融",
    url: "https://www.cnrds.com/",
    access: "机构订阅",
    coverage: "中国研究数据服务平台，上市公司、创新、专利、环境、文本等",
    tags: ["中国", "企业", "上市公司", "专利", "绿色创新", "文本"],
    priority: 8,
    indicators: [
      { name: "企业绿色创新、专利、媒体、文本", code: "CNRDS modules", tags: ["绿色创新", "专利", "文本"] }
    ]
  },
  {
    title: "Lens.org",
    category: "专利与创新",
    url: "https://www.lens.org/",
    access: "开放/注册",
    coverage: "全球专利和学术文献检索，可用于创新与技术扩散研究",
    tags: ["专利", "创新", "技术", "绿色创新", "全球"],
    priority: 7,
    indicators: [
      { name: "Patent families / citations", code: "Lens patent search", tags: ["专利", "创新"] }
    ]
  },
  {
    title: "Google Patents",
    category: "专利与创新",
    url: "https://patents.google.com/",
    access: "开放",
    coverage: "全球专利检索，适合快速查技术、申请人和分类号",
    tags: ["专利", "创新", "技术", "绿色创新"],
    priority: 6,
    indicators: [
      { name: "Patent search by CPC/IPC/applicant", code: "Google Patents", tags: ["专利", "技术"] }
    ]
  },
  {
    title: "CEADs",
    category: "环境与能源",
    url: "https://www.ceads.net/",
    access: "开放",
    coverage: "中国和全球碳排放核算，含省级、城市、行业等碳数据产品",
    tags: ["中国", "省级", "城市", "碳", "能源", "环境", "行业"],
    priority: 10,
    indicators: [
      { name: "China city/province carbon emissions", code: "CEADs China datasets", tags: ["碳", "城市", "省级"] },
      { name: "Sectoral CO2 emissions", code: "CEADs sector", tags: ["碳", "行业"] }
    ]
  },
  {
    title: "EDGAR Emissions Database",
    category: "环境与能源",
    url: "https://edgar.jrc.ec.europa.eu/",
    access: "开放",
    coverage: "全球温室气体和空气污染物排放清单",
    tags: ["全球", "国家", "碳", "污染", "环境", "能源"],
    priority: 7,
    indicators: [
      { name: "GHG and air pollutant emissions", code: "EDGAR", tags: ["碳", "污染"] }
    ]
  },
  {
    title: "Our World in Data",
    category: "环境与能源",
    url: "https://ourworldindata.org/",
    access: "开放",
    coverage: "能源、碳排放、健康、人口、技术扩散等主题的可视化数据",
    tags: ["国家", "跨国", "碳", "能源", "人口", "技术", "开放数据"],
    priority: 8,
    indicators: [
      { name: "CO2 and energy dataset", code: "OWID grapher", tags: ["碳", "能源"] },
      { name: "Internet / technology adoption", code: "OWID technology", tags: ["数字经济", "技术"] }
    ]
  },
  {
    title: "IEA Data",
    category: "环境与能源",
    url: "https://www.iea.org/data-and-statistics",
    access: "部分开放/部分订阅",
    coverage: "能源平衡、能源价格、低碳能源和政策相关数据",
    tags: ["能源", "碳", "国家", "政策"],
    priority: 6,
    indicators: [
      { name: "Energy balance and energy indicators", code: "IEA", tags: ["能源", "碳"] }
    ]
  },
  {
    title: "GDELT",
    category: "新闻与文本",
    url: "https://www.gdeltproject.org/",
    access: "开放",
    coverage: "全球新闻事件、主题、语调和媒体文本数据",
    tags: ["新闻", "事件", "文本", "全球", "国家", "舆情"],
    priority: 8,
    indicators: [
      { name: "Event and tone variables", code: "GDELT 2.1", tags: ["新闻", "事件", "文本"] }
    ]
  },
  {
    title: "Factiva",
    category: "新闻与文本",
    url: "https://global.factiva.com/",
    access: "机构订阅",
    coverage: "全球新闻、企业和商业信息档案，适合新闻文本和事件研究",
    tags: ["新闻", "文本", "企业", "国家", "媒体"],
    priority: 7,
    indicators: [
      { name: "News archive search", code: "Factiva query", tags: ["新闻", "文本"] }
    ]
  },
  {
    title: "Nexis Uni",
    category: "新闻与文本",
    url: "https://advance.lexis.com/",
    access: "机构订阅",
    coverage: "新闻、法律、商业信息数据库，适合文本和政策事件检索",
    tags: ["新闻", "法律", "文本", "政策"],
    priority: 6,
    indicators: [
      { name: "News/legal archive", code: "Nexis query", tags: ["新闻", "政策", "文本"] }
    ]
  }
];

const thinkTanks = [
  {
    title: "中国智库网",
    category: "中国智库",
    url: "https://www.chinathinktanks.org.cn/",
    level: "智库平台",
    tags: ["中国", "智库", "政策咨询", "研究成果", "专家观点"],
    description: "国务院发展研究中心主办的智库信息平台，适合查找中国智库动态、研究成果和专家观点。"
  },
  {
    title: "国务院发展研究中心",
    category: "中国智库",
    url: "https://www.drc.gov.cn/index.html",
    level: "国家高端智库",
    tags: ["中国", "宏观政策", "发展战略", "调查研究", "政策咨询"],
    description: "综合性政策研究和决策咨询机构，适合查宏观经济、产业、区域和发展战略研究。"
  },
  {
    title: "中国社会科学院",
    category: "中国智库",
    url: "https://www.cass.cn/",
    level: "国家级",
    tags: ["中国", "社科", "区域国别", "国际研究", "经济"],
    description: "社会科学综合研究机构，覆盖经济、政治、社会、国际关系和区域国别等研究方向。"
  },
  {
    title: "中国现代国际关系研究院",
    category: "中国智库",
    url: "http://www.cicir.ac.cn/NEW/index.html",
    level: "中国",
    tags: ["国际关系", "安全", "战略", "区域国别", "外交"],
    description: "综合性国际问题研究机构，适合国际关系、安全、战略和地区研究资料。"
  },
  {
    title: "中国国际问题研究院",
    category: "中国智库",
    url: "https://www.ciis.org.cn/",
    level: "中国",
    tags: ["国际关系", "外交", "地区研究", "全球治理"],
    description: "外交与国际问题研究机构，适合查找国际形势、外交政策和地区研究分析。"
  },
  {
    title: "中国国际经济交流中心",
    category: "中国智库",
    url: "https://www.cciee.org.cn/",
    level: "中国",
    tags: ["经济", "宏观政策", "国际经济", "开放", "产业"],
    description: "聚焦宏观经济、国际经济合作、产业政策和开放型经济的研究与交流平台。"
  },
  {
    title: "北京大学国家发展研究院",
    category: "中国智库",
    url: "https://nsd.pku.edu.cn/",
    level: "高校",
    tags: ["经济", "发展", "中国", "政策", "学术"],
    description: "围绕中国经济、发展政策、制度转型和企业研究提供学术与政策资源。"
  },
  {
    title: "清华大学国情研究院",
    category: "中国智库",
    url: "http://www.iccs.tsinghua.edu.cn/",
    level: "高校",
    tags: ["中国", "国情", "公共政策", "发展战略"],
    description: "关注中国国情、国家治理、发展战略和公共政策研究。"
  },
  {
    title: "CSIS",
    category: "美国智库",
    url: "https://www.csis.org/",
    level: "美国",
    tags: ["战略", "安全", "地缘政治", "技术", "国际关系"],
    description: "国际战略与安全研究智库，覆盖国防、地缘政治、经济安全和技术政策。"
  },
  {
    title: "Brookings Institution",
    category: "美国智库",
    url: "https://www.brookings.edu/",
    level: "美国",
    tags: ["公共政策", "经济", "治理", "国际关系", "城市"],
    description: "非党派公共政策研究机构，适合宏观政策、治理、发展和国际议题。"
  },
  {
    title: "Chatham House",
    category: "英国智库",
    url: "https://www.chathamhouse.org/",
    level: "英国",
    tags: ["国际关系", "全球治理", "安全", "能源", "地区研究"],
    description: "英国皇家国际事务研究所，提供国际事务研究、政策分析和专家评论。"
  },
  {
    title: "Council on Foreign Relations",
    category: "美国智库",
    url: "https://www.cfr.org/",
    level: "美国",
    tags: ["国际关系", "外交", "地区研究", "安全", "经济"],
    description: "外交关系委员会，适合国际关系背景资料、专题分析和政策报告。"
  },
  {
    title: "Carnegie Endowment",
    category: "全球与跨区域智库",
    url: "https://carnegieendowment.org/",
    level: "全球",
    tags: ["国际关系", "治理", "技术", "区域", "和平"],
    description: "全球性国际事务智库，覆盖地区研究、民主治理、技术政策和国际安全。"
  },
  {
    title: "RAND Corporation",
    category: "美国智库",
    url: "https://www.rand.org/",
    level: "美国",
    tags: ["安全", "防务", "公共政策", "方法", "评估"],
    description: "政策研究机构，擅长安全、防务、公共政策、风险评估和方法研究。"
  },
  {
    title: "IISS",
    category: "英国智库",
    url: "https://www.iiss.org/",
    level: "英国",
    tags: ["安全", "军事", "战略", "地区研究", "防务"],
    description: "国际战略研究所，适合安全、军事、防务和地区战略资料。"
  },
  {
    title: "Atlantic Council",
    category: "美国智库",
    url: "https://www.atlanticcouncil.org/",
    level: "美国",
    tags: ["国际关系", "战略", "跨大西洋", "地缘政治", "安全", "经济安全"],
    description: "美国国际事务智库，覆盖跨大西洋关系、地缘政治、安全、能源、科技和经济安全议题。"
  },
  {
    title: "Wilson Center",
    category: "美国智库",
    url: "https://www.wilsoncenter.org/",
    level: "美国",
    tags: ["国际关系", "区域研究", "美国", "国会", "政策研究", "非党派"],
    description: "美国国会特许的非党派研究中心，适合查区域研究、美国外交、技术、移民和政策背景资料。"
  },
  {
    title: "German Marshall Fund",
    category: "全球与跨区域智库",
    url: "https://www.gmfus.org/",
    level: "美国 / 欧洲",
    tags: ["跨大西洋", "欧洲", "美国", "民主", "安全", "技术"],
    description: "跨大西洋政策组织，关注欧美关系、民主韧性、安全、技术竞争和全球秩序。"
  },
  {
    title: "RUSI",
    category: "英国智库",
    url: "https://www.rusi.org/",
    level: "英国",
    tags: ["安全", "防务", "军事", "情报", "国际事务", "英国"],
    description: "英国皇家联合军种研究所，适合查防务、安全、军事、情报和国际事务研究。"
  },
  {
    title: "SIPRI",
    category: "欧洲智库",
    url: "https://www.sipri.org/",
    level: "瑞典",
    tags: ["安全", "和平研究", "军备控制", "军费", "冲突", "数据"],
    description: "斯德哥尔摩国际和平研究所，适合查军费、军备控制、冲突、和平与安全数据库。"
  },
  {
    title: "PIIE",
    category: "美国智库",
    url: "https://www.piie.com/",
    level: "美国",
    aliases: ["Peterson Institute for International Economics"],
    tags: ["国际经济", "贸易", "金融", "全球化", "宏观", "政治经济"],
    description: "彼得森国际经济研究所，适合国际贸易、全球化、金融、宏观经济和政治经济研究。"
  },
  {
    title: "Bruegel",
    category: "欧洲智库",
    url: "https://www.bruegel.org/",
    level: "欧盟 / 比利时",
    tags: ["欧洲", "欧盟", "经济政策", "贸易", "金融", "能源"],
    description: "布鲁塞尔经济政策智库，适合欧盟经济治理、贸易、金融、能源和产业政策研究。"
  },
  {
    title: "SWP",
    category: "欧洲智库",
    url: "https://www.swp-berlin.org/en/",
    level: "德国",
    aliases: ["German Institute for International and Security Affairs"],
    tags: ["德国", "欧洲", "国际关系", "安全", "外交政策", "区域研究"],
    description: "德国国际与安全事务研究所，适合德国和欧洲外交、安全、国际政治与区域研究。"
  },
  {
    title: "Ifri",
    category: "欧洲智库",
    url: "https://www.ifri.org/en",
    level: "法国",
    aliases: ["French Institute of International Relations"],
    tags: ["法国", "欧洲", "国际关系", "安全", "能源", "全球治理"],
    description: "法国国际关系研究所，适合法国、欧洲、国际安全、能源、地区研究和全球治理议题。"
  },
  {
    title: "ECFR",
    category: "欧洲智库",
    url: "https://ecfr.eu/",
    level: "欧洲",
    aliases: ["European Council on Foreign Relations"],
    tags: ["欧洲", "欧盟", "外交政策", "安全", "地缘政治", "战略"],
    description: "欧洲外交关系委员会，适合欧盟外交、安全、战略自主和欧洲对外关系研究。"
  },
  {
    title: "CIDOB",
    category: "欧洲智库",
    url: "https://www.cidob.org/en/",
    level: "西班牙",
    tags: ["欧洲", "地中海", "国际关系", "全球城市", "移民", "安全"],
    description: "巴塞罗那国际事务中心，适合欧洲、地中海、全球城市、移民和国际安全议题。"
  },
  {
    title: "CIGI",
    category: "加拿大智库",
    url: "https://www.cigionline.org/",
    level: "加拿大",
    aliases: ["Centre for International Governance Innovation"],
    tags: ["全球治理", "数字治理", "AI治理", "技术", "国际法", "经济"],
    description: "加拿大国际治理创新中心，聚焦数字治理、AI、国际法、经济治理和全球制度创新。"
  },
  {
    title: "Center for Global Development",
    category: "全球与跨区域智库",
    url: "https://www.cgdev.org/",
    level: "美国 / 英国",
    aliases: ["CGD"],
    tags: ["发展", "全球南方", "减贫", "发展金融", "卫生", "教育"],
    description: "全球发展中心，适合发展经济、全球减贫、发展金融、全球卫生、教育和援助政策研究。"
  },
  {
    title: "ODI Global",
    category: "全球与跨区域智库",
    url: "https://odi.org/",
    level: "英国 / 全球",
    tags: ["发展", "全球治理", "不平等", "气候", "人道主义", "经济转型"],
    description: "全球发展与公共政策智库，适合发展、气候、人道主义、不平等和全球治理研究。"
  },
  {
    title: "Observer Research Foundation",
    category: "南亚智库",
    url: "https://www.orfonline.org/",
    level: "印度",
    aliases: ["ORF"],
    tags: ["印度", "南亚", "印太", "全球治理", "安全", "经济"],
    description: "印度代表性政策智库，适合印度外交、印太、安全、技术治理、经济和全球南方议题。"
  },
  {
    title: "MP-IDSA",
    category: "南亚智库",
    url: "https://idsa.in/",
    level: "印度",
    aliases: ["Manohar Parrikar Institute for Defence Studies and Analyses"],
    tags: ["印度", "南亚", "安全", "防务", "国际关系", "战略"],
    description: "印度防务与安全研究机构，适合南亚安全、印度防务、国际关系和战略研究。"
  },
  {
    title: "SAIIA",
    category: "非洲智库",
    url: "https://saiia.org.za/",
    level: "南非",
    aliases: ["South African Institute of International Affairs"],
    tags: ["非洲", "南非", "国际关系", "治理", "经济外交", "全球南方"],
    description: "南非国际事务研究所，适合非洲国际关系、治理、经济外交、区域合作和全球南方议题。"
  },
  {
    title: "Institute for Security Studies Africa",
    category: "非洲智库",
    url: "https://issafrica.org/",
    level: "非洲 / 南非",
    aliases: ["ISS Africa"],
    tags: ["非洲", "安全", "治理", "冲突", "发展", "预测"],
    description: "非洲安全研究所，适合非洲安全、治理、冲突、发展、犯罪和政策预测研究。"
  },
  {
    title: "FGV",
    category: "拉美智库",
    url: "https://portal.fgv.br/en",
    level: "巴西",
    aliases: ["Fundacao Getulio Vargas"],
    tags: ["巴西", "拉美", "经济", "公共政策", "社会发展", "数据"],
    description: "巴西热图利奥·瓦加斯基金会，适合巴西经济、公共政策、社会发展和拉美研究。"
  },
  {
    title: "CARI",
    category: "拉美智库",
    url: "https://cari.org.ar/",
    level: "阿根廷",
    aliases: ["Consejo Argentino para las Relaciones Internacionales"],
    tags: ["阿根廷", "拉美", "国际关系", "外交", "地区研究"],
    description: "阿根廷国际关系委员会，适合阿根廷外交、拉美国际关系和区域研究。"
  },
  {
    title: "Lowy Institute",
    category: "澳大利亚智库",
    url: "https://www.lowyinstitute.org/",
    level: "澳大利亚",
    tags: ["亚太", "国际关系", "外交", "地区研究"],
    description: "亚太国际关系和澳大利亚外交政策研究智库，适合印太和区域议题。"
  },
  {
    title: "MERICS",
    category: "欧洲智库",
    url: "https://merics.org/en",
    level: "欧洲",
    tags: ["中国研究", "欧中关系", "政策", "技术", "产业"],
    description: "欧洲中国研究智库，适合欧中关系、中国政策、产业和技术议题观察。"
  },
  {
    title: "ISEAS - Yusof Ishak Institute",
    category: "东南亚与ASEAN智库",
    url: "https://www.iseas.edu.sg/",
    level: "新加坡",
    aliases: ["ISEAS", "尤索夫·伊萨东南亚研究所", "尤索夫伊萨东南亚研究所", "尤索夫伊萨研究院", "新加坡东南亚研究所"],
    tags: ["东南亚", "东南亚研究", "ASEAN", "区域国别", "政治经济", "安全", "社会"],
    description: "东南亚研究核心机构，覆盖东南亚政治、经济、安全、社会、区域合作与国别研究；Fulcrum 为其评论与分析平台。",
    actions: [{ label: "Fulcrum", url: "https://fulcrum.sg/" }]
  },
  {
    title: "RSIS",
    category: "东南亚与ASEAN智库",
    url: "https://rsis.edu.sg/",
    level: "新加坡",
    aliases: ["S. Rajaratnam School of International Studies", "拉惹勒南国际关系学院", "拉惹勒南国际研究院", "南洋理工大学", "Nanyang Technological University", "NTU"],
    tags: ["东南亚", "东南亚研究", "安全", "战略", "国际关系", "非传统安全", "ASEAN"],
    description: "南洋理工大学拉惹勒南国际关系学院，兼具研究生院与智库职能，提供东南亚安全、国际关系、战略和非传统安全研究。",
    actions: [{ label: "南洋理工大学", url: "https://www.ntu.edu.sg/" }]
  },
  {
    title: "ASEAN-ISIS / 东盟战略与国际研究所网络",
    category: "东南亚与ASEAN智库",
    url: "https://www.isis.org.my/2018/09/23/asean-isis/",
    linkText: "网络介绍",
    level: "东盟 / 智库网络",
    aliases: ["ASEAN Institutes of Strategic and International Studies", "ASEAN Institute of Strategic and International Studies", "东盟战略与国际研究所", "东盟战略与国际问题研究所网络", "ASEAN ISIS"],
    tags: ["东南亚", "东南亚研究", "ASEAN", "智库网络", "二轨外交", "安全", "国际关系"],
    description: "东盟战略与国际研究机构组成的智库网络，不是单一研究所；链接为成员机构 ISIS Malaysia 发布的网络与成员介绍。"
  },
  {
    title: "新加坡国立大学 / NUS",
    category: "东南亚与ASEAN智库",
    url: "https://www.nus.edu.sg/",
    level: "新加坡 / 高校",
    aliases: ["National University of Singapore", "新国大", "NUS Southeast Asian Studies"],
    tags: ["东南亚", "东南亚研究", "新加坡", "高校", "区域国别", "社会科学", "人文"],
    description: "新加坡国立大学官网；附东南亚研究系入口，可查师资、研究、课程、讲座和相关学术活动。",
    actions: [{ label: "东南亚研究系", url: "https://fass.nus.edu.sg/sea/" }]
  },
  {
    title: "朱拉隆功大学 / Chulalongkorn University",
    category: "东南亚与ASEAN智库",
    url: "https://www.chula.ac.th/en/",
    level: "泰国 / 高校",
    aliases: ["Chula", "泰国朱拉隆功大学", "朱拉隆功"],
    tags: ["东南亚", "东南亚研究", "泰国", "高校", "区域国别", "社会科学", "研究机构"],
    description: "朱拉隆功大学英文官网，提供学院、研究单位、研究成果及国际合作信息，是查找泰国高校与区域研究资源的入口。"
  },
  {
    title: "清迈大学 / Chiang Mai University",
    category: "东南亚与ASEAN智库",
    url: "https://www.cmu.ac.th/",
    level: "泰国 / 高校",
    aliases: ["CMU", "泰国清迈大学", "清邁大學"],
    tags: ["东南亚", "东南亚研究", "泰国", "清迈", "高校", "社会科学", "区域国别"],
    description: "清迈大学官网，提供学院、研究单位、研究动态和国际合作入口，可进一步查找泰国及东南亚研究资源。"
  },
  {
    title: "越南社会科学院 / VASS",
    category: "东南亚与ASEAN智库",
    url: "https://en.vass.gov.vn/",
    level: "越南 / 社会科学研究机构",
    aliases: ["Vietnam Academy of Social Sciences", "Viet Nam Academy of Social Sciences", "越南社会科学翰林院", "越南社科院"],
    tags: ["东南亚", "东南亚研究", "越南", "社会科学", "人文", "区域国别", "政策研究"],
    description: "越南社会科学院英文门户，提供社会科学与人文研究动态、成员单位及学术合作信息。",
    actions: [{ label: "成员单位", url: "https://en.vass.gov.vn/member-units" }]
  },
  {
    title: "越南外交学院 / DAV",
    category: "东南亚与ASEAN智库",
    url: "https://dav.edu.vn/en/",
    level: "越南 / 外交与国际关系",
    aliases: ["Diplomatic Academy of Vietnam", "Diplomatic Academy of Viet Nam"],
    tags: ["东南亚", "东南亚研究", "越南", "外交", "国际关系", "ASEAN", "安全"],
    description: "越南外交学院英文官网，提供外交与国际关系研究、学术活动、培训及国际合作信息。"
  },
  {
    title: "马来西亚理科大学 / USM",
    category: "东南亚与ASEAN智库",
    url: "https://www.usm.my/en/",
    level: "马来西亚 / 高校",
    aliases: ["Universiti Sains Malaysia", "University of Science Malaysia", "马来西亚科学大学"],
    tags: ["东南亚", "东南亚研究", "马来西亚", "高校", "社会科学", "人文", "区域国别"],
    description: "马来西亚理科大学英文官网，提供学院、研究机构和学术活动入口，可进一步查找人文、社会科学与区域研究资源。"
  },
  {
    title: "老挝国立大学 / NUOL",
    category: "东南亚与ASEAN智库",
    url: "https://www.nuol.edu.la/index.php/en/",
    level: "老挝 / 高校",
    aliases: ["National University of Laos", "老挝国家大学", "老撾國家大學"],
    tags: ["东南亚", "东南亚研究", "老挝", "高校", "区域国别", "国际合作"],
    description: "老挝国立大学英文官网，提供院系、研究活动及国际合作信息。2026-10-13 本地连接核验遇到证书异常，官网入口已通过公开索引确认。"
  },
  {
    title: "老挝外交学院 / IFA",
    category: "东南亚与ASEAN智库",
    url: "https://www.mofa.gov.la/",
    linkText: "主管部门",
    level: "老挝 / 外交培训与研究",
    aliases: ["Institute of Foreign Affairs", "Institute of Foreign Affairs of Lao PDR", "老挝外交研究所", "Lao Diplomatic Institute"],
    tags: ["东南亚", "东南亚研究", "老挝", "外交", "ASEAN-ISIS", "主管部门入口"],
    description: "老挝外交部所属 Institute of Foreign Affairs（IFA）。尚未确认独立官网，主链接为外交部入口，附 MISIS 官方合作机构名录；主管部门网站在本次核验时存在证书异常。",
    actions: [{ label: "机构名录", url: "https://myanmarisis.org/network/" }]
  },
  {
    title: "仰光大学 / University of Yangon",
    category: "东南亚与ASEAN智库",
    url: "https://www.uy.edu.mm/",
    level: "缅甸 / 高校",
    aliases: ["Yangon University", "University of Rangoon", "缅甸仰光大学", "UY"],
    tags: ["东南亚", "东南亚研究", "缅甸", "仰光", "高校", "社会科学", "人文"],
    description: "仰光大学官方网站，提供学术院系、研究、课程和学校动态，是查找缅甸高校研究资源的入口。"
  },
  {
    title: "缅甸战略与国际研究所 / MISIS",
    category: "东南亚与ASEAN智库",
    url: "https://myanmarisis.org/",
    level: "缅甸 / 智库",
    aliases: ["Myanmar Institute of Strategic and International Studies", "Myanmar ISIS", "Myanmar-ISIS", "MSIS", "缅甸战略与国际研究中心", "缅甸战略与国际问题研究所"],
    tags: ["东南亚", "东南亚研究", "缅甸", "ASEAN-ISIS", "外交", "战略", "国际关系"],
    description: "缅甸战略与国际研究机构，官网使用 MISIS 缩写；提供外交、区域安全、国际关系研究及二轨交流活动信息。"
  },
  {
    title: "柬埔寨合作与和平研究所 / CICP",
    category: "东南亚与ASEAN智库",
    url: "https://cicp.org.kh/",
    level: "柬埔寨 / 智库",
    aliases: ["Cambodian Institute for Cooperation and Peace", "柬埔寨合作与和平中心", "柬埔寨合作与和平研究院"],
    tags: ["东南亚", "东南亚研究", "柬埔寨", "ASEAN", "和平", "安全", "国际关系"],
    description: "柬埔寨合作与和平研究所官网，提供国际关系、地区合作与和平安全议题的研究、出版物和学术活动。"
  },
  {
    title: "ERIA",
    category: "东南亚与ASEAN智库",
    url: "https://www.eria.org/",
    level: "印尼 / ASEAN+",
    tags: ["东南亚", "ASEAN", "经济一体化", "贸易", "产业", "政策"],
    description: "东盟与东亚经济研究所，聚焦 ASEAN 和东亚经济一体化、贸易、产业、数字经济与政策研究。"
  },
  {
    title: "ISIS Malaysia",
    category: "东南亚与ASEAN智库",
    url: "https://www.isis.org.my/",
    level: "马来西亚",
    tags: ["东南亚", "马来西亚", "外交政策", "安全", "经济", "社会政策"],
    description: "马来西亚战略与国际问题研究所，适合马来西亚外交、安全、经济、社会政策和区域合作研究。"
  },
  {
    title: "CSIS Indonesia",
    category: "东南亚与ASEAN智库",
    url: "https://www.csis.or.id/",
    level: "印度尼西亚",
    tags: ["东南亚", "印尼", "政治", "经济", "国际关系", "安全"],
    description: "印尼战略与国际问题研究中心，适合印尼政治、经济、国际关系、安全与政策研究。"
  },
  {
    title: "全球智库机构目录（CASISD）",
    category: "智库目录",
    url: "http://www.casisd.cn/xglj/qqzkjg/",
    level: "中国",
    tags: ["智库目录", "全球智库", "政策研究", "机构导航"],
    description: "中国科学院科技战略咨询研究院整理的全球智库机构链接，适合做智库来源扩展和机构索引。"
  },
  {
    title: "Harvard Fairbank Center for Chinese Studies",
    category: "美国智库",
    url: "https://fairbank.fas.harvard.edu/",
    level: "美国",
    tags: ["中国研究", "高校", "区域国别", "东亚", "学术活动"],
    description: "哈佛大学费正清中国研究中心，适合查中国研究活动、讲座、出版和学术资源。"
  },
  {
    title: "Stanford Freeman Spogli Institute",
    category: "美国智库",
    url: "https://fsi.stanford.edu/",
    level: "美国",
    tags: ["国际关系", "安全", "发展", "治理", "高校"],
    description: "斯坦福大学国际研究院，覆盖国际安全、发展、治理、健康政策和区域研究。"
  },
  {
    title: "Columbia Harriman Institute",
    category: "美国智库",
    url: "https://harriman.columbia.edu/",
    level: "美国",
    tags: ["俄罗斯", "欧亚", "区域国别", "国际关系", "高校"],
    description: "哥伦比亚大学哈里曼研究所，聚焦俄罗斯、欧亚和东欧区域研究。"
  },
  {
    title: "Oxford School of Global and Area Studies",
    category: "英国智库",
    url: "https://www.area-studies.ox.ac.uk/",
    level: "英国",
    tags: ["区域国别", "全球研究", "亚洲", "非洲", "欧洲"],
    description: "牛津大学全球与区域研究学院，适合查区域国别研究项目、讲座和研究中心。"
  },
  {
    title: "SOAS University of London",
    category: "英国智库",
    url: "https://www.soas.ac.uk/",
    level: "英国",
    tags: ["亚洲", "非洲", "中东", "区域国别", "发展"],
    description: "伦敦大学亚非学院，聚焦亚洲、非洲、中东、语言、发展和区域研究。"
  },
  {
    title: "Asia Research Institute, NUS",
    category: "东南亚与ASEAN智库",
    url: "https://ari.nus.edu.sg/",
    level: "新加坡",
    aliases: ["ARI", "新加坡国立大学亚洲研究所", "新国大亚洲研究所"],
    tags: ["亚洲", "东南亚", "东南亚研究", "社会", "文化", "区域研究"],
    description: "新加坡国立大学亚洲研究所，适合亚洲与东南亚社会、文化、城市和跨国议题研究。"
  },
  {
    title: "北京大学区域与国别研究院",
    category: "中国智库",
    url: "https://ias.pku.edu.cn/",
    level: "中国",
    tags: ["区域国别", "北京大学", "国际关系", "地区研究"],
    description: "北京大学区域与国别研究院，适合查区域国别研究动态、项目、讲座和学术资源。"
  },
  {
    title: "清华大学国际与地区研究院",
    category: "中国智库",
    url: "https://iias.tsinghua.edu.cn/",
    level: "中国",
    tags: ["区域国别", "清华大学", "国际关系", "地区研究"],
    description: "清华大学国际与地区研究院，聚焦国际与地区研究、田野调查和区域国别人才培养。"
  },
  {
    title: "中国社会科学院国家国际战略研究院",
    category: "中国智库",
    url: "http://niis.cssn.cn/",
    level: "中国",
    tags: ["国际战略", "国际关系", "安全", "外交", "区域国别"],
    description: "中国社会科学院国家国际战略研究院，适合查国际战略、地区安全和中国外交相关研究。"
  }
];

const newsSources = [
  {
    title: "新华网",
    category: "中国大陆新闻",
    url: "https://www.news.cn/",
    level: "中国",
    tags: ["中文", "主入口", "官方", "国内", "国际", "时政"],
    description: "新华网中文主入口，适合追踪官方新闻、国内外要闻和政策动态。"
  },
  {
    title: "人民网",
    category: "中国大陆新闻",
    url: "https://www.people.com.cn/",
    level: "中国",
    tags: ["中文", "主入口", "时政", "政策", "评论", "人民日报"],
    description: "人民日报社主办新闻网站主入口，适合查时政、政策、评论和专题报道。"
  },
  {
    title: "中国新闻网",
    category: "中国大陆新闻",
    url: "https://www.chinanews.com.cn/",
    level: "中国",
    tags: ["中文", "主入口", "综合新闻", "国际", "社会", "华人"],
    description: "中国新闻网主入口，适合查突发、社会、国际和华人华侨相关新闻。"
  },
  {
    title: "央视新闻",
    category: "中国大陆新闻",
    url: "https://news.cctv.com/",
    level: "中国",
    tags: ["中文", "新闻页", "视频", "时政", "电视", "专题"],
    description: "央视新闻页，适合重大事件、电视新闻、专题报道和视频素材。"
  },
  {
    title: "财新",
    category: "中国大陆新闻",
    url: "https://www.caixin.com/",
    level: "中国",
    tags: ["中文", "主入口", "财经", "商业", "宏观", "调查", "金融"],
    description: "财新主入口，覆盖财经、商业、宏观经济与调查报道，部分内容可能需要订阅。"
  },
  {
    title: "澎湃新闻",
    category: "中国大陆新闻",
    url: "https://www.thepaper.cn/",
    level: "中国",
    tags: ["中文", "主入口", "时政", "思想", "社会", "评论"],
    description: "澎湃新闻主入口，适合查时政、社会、思想评论和深度报道。"
  },
  {
    title: "Reuters",
    category: "国际通讯社",
    url: "https://www.reuters.com/",
    level: "英国",
    aliases: ["路透社"],
    tags: ["英文", "主入口", "通讯社", "财经", "国际", "市场", "全球报道"],
    description: "英国通讯社主入口，覆盖世界新闻、市场、商业等板块；适合跨国事件和财经新闻追踪。"
  },
  {
    title: "Agence France-Presse",
    category: "国际通讯社",
    url: "https://www.afp.com/",
    level: "法国",
    aliases: ["法新社"],
    tags: ["英文", "主入口", "法新社", "通讯社", "国际", "图片"],
    description: "法新社官网主入口，适合追踪全球新闻、图片、视频和多语种通讯社报道。"
  },
  {
    title: "United Press International",
    category: "国际通讯社",
    url: "https://www.upi.com/",
    level: "美国",
    aliases: ["合众国际社"],
    tags: ["英文", "主入口", "合众国际社", "通讯社", "国际", "突发"],
    description: "合众国际社主入口，覆盖国际、美国、商业、科技、娱乐和专题新闻。"
  },
  {
    title: "TASS Russian News Agency",
    category: "国际通讯社",
    url: "https://tass.com/",
    level: "俄罗斯",
    aliases: ["塔斯社"],
    tags: ["英文", "国际版", "塔斯社", "TASS", "俄罗斯", "通讯社", "国际"],
    description: "Information Telegraphic Agency of Russia-TASS 英文入口，适合追踪俄罗斯官方视角下的俄罗斯和国际新闻。"
  },
  {
    title: "The Economist",
    category: "英国新闻",
    url: "https://www.economist.com/",
    level: "英国",
    aliases: ["经济学人"],
    tags: ["英文", "主入口", "财经", "国际", "评论", "订阅"],
    description: "经济学人主入口，覆盖国际政治、经济、商业和科技评论；适合把握全球议题的周度分析框架。"
  },
  {
    title: "The Guardian",
    category: "英国新闻",
    url: "https://www.theguardian.com/",
    level: "英国",
    aliases: ["卫报"],
    tags: ["英文", "主入口", "可切换地区", "国际", "英国", "美国", "评论"],
    description: "卫报主入口，覆盖国际新闻、政治、社会、气候和评论；站内可进入 International、UK、US 等分版。",
    actions: [{ label: "国际版", url: "https://www.theguardian.com/international" }]
  },
  {
    title: "The New York Times",
    category: "美国新闻",
    url: "https://www.nytimes.com/",
    level: "美国",
    aliases: ["纽约时报"],
    tags: ["英文", "主入口", "美国", "国际", "深度报道", "订阅"],
    description: "纽约时报主入口，兼具美国国内与国际报道，适合查深度报道、解释性新闻和评论，部分内容需要订阅。"
  },
  {
    title: "Bloomberg",
    category: "美国新闻",
    url: "https://www.bloomberg.com/",
    level: "美国 / US版",
    aliases: ["彭博社"],
    tags: ["英文", "主入口", "US Edition", "美国", "财经", "市场", "全球报道", "订阅"],
    description: "彭博默认打开 US Edition，适合追踪美国与全球财经、市场、企业和宏观经济新闻；同卡片保留亚洲分入口。",
    actions: [{ label: "亚洲", url: "https://www.bloomberg.com/asia" }]
  },
  {
    title: "Financial Times",
    category: "英国新闻",
    url: "https://www.ft.com/",
    level: "英国",
    aliases: ["金融时报"],
    tags: ["英文", "主入口", "财经", "市场", "商业", "国际", "订阅"],
    description: "金融时报主入口，覆盖国际财经、商业、金融市场和地缘经济新闻，部分内容需要订阅。"
  },
  {
    title: "The Wall Street Journal",
    category: "美国新闻",
    url: "https://www.wsj.com/",
    level: "美国",
    aliases: ["华尔街日报"],
    tags: ["英文", "主入口", "美国", "财经", "商业", "市场", "订阅"],
    description: "华尔街日报主入口，兼具美国经济、商业、金融市场与国际财经报道，部分内容需要订阅。"
  },
  {
    title: "CNN",
    category: "美国新闻",
    url: "https://www.cnn.com/",
    level: "美国 / 主入口",
    aliases: ["美国有线电视新闻网", "有线电视新闻网", "CNN News", "Cable News Network"],
    tags: ["英文", "主入口", "可切换地区", "国际", "美国", "突发", "视频"],
    description: "CNN 主入口，适合追踪突发新闻、美国国内新闻和国际新闻；需要纯国际视角时可直接进 International edition。",
    actions: [{ label: "国际版", url: "https://edition.cnn.com/" }]
  },
  {
    title: "Fox News",
    category: "美国新闻",
    url: "https://www.foxnews.com/",
    level: "美国 / 主入口",
    aliases: ["福克斯", "福克斯新闻", "福克斯新闻网", "福克斯新闻频道", "FOX"],
    tags: ["英文", "主入口", "美国", "政治", "国际", "突发", "视频"],
    description: "福克斯新闻官网，覆盖美国政治、国际新闻、突发事件和视频报道。"
  },
  {
    title: "ABC News",
    category: "美国新闻",
    url: "https://abcnews.com/",
    level: "美国 / 主入口",
    aliases: ["ABC", "美国广播公司", "美国广播公司新闻", "ABC News US"],
    tags: ["英文", "主入口", "美国", "政治", "国际", "突发", "视频"],
    description: "美国广播公司新闻入口，覆盖美国与国际新闻、政治、社会和视频报道。"
  },
  {
    title: "CBS News",
    category: "美国新闻",
    url: "https://www.cbsnews.com/",
    level: "美国 / 主入口",
    aliases: ["CBS", "哥伦比亚广播公司", "哥伦比亚广播公司新闻"],
    tags: ["英文", "主入口", "美国", "政治", "突发", "调查报道", "视频"],
    description: "哥伦比亚广播公司新闻入口，提供美国新闻、突发报道和新闻视频。"
  },
  {
    title: "NBC News",
    category: "美国新闻",
    url: "https://www.nbcnews.com/",
    level: "美国 / 主入口",
    aliases: ["NBC", "美国全国广播公司", "全国广播公司", "全国广播公司新闻"],
    tags: ["英文", "主入口", "美国", "政治", "国际", "突发", "视频"],
    description: "美国全国广播公司新闻入口，提供美国与国际新闻、政治报道和视频。"
  },
  {
    title: "POLITICO",
    category: "美国新闻",
    url: "https://www.politico.com/",
    level: "美国 / 主入口",
    aliases: ["Politico", "政治新闻网", "政客新闻网", "政客"],
    tags: ["英文", "主入口", "美国", "政治", "政策", "国会", "选举"],
    description: "聚焦美国政治与公共政策的新闻网站，适合追踪白宫、国会、选举和政策动向。"
  },
  {
    title: "MS NOW",
    category: "美国新闻",
    url: "https://www.ms.now/",
    level: "美国 / 主入口",
    aliases: ["MSNOW", "MSNBC", "原 MSNBC", "My Source for News, Opinion, and the World"],
    tags: ["英文", "主入口", "美国", "政治", "时事", "评论", "视频"],
    description: "原 MSNBC 的现用品牌，提供美国政治、时事新闻、评论、访谈及视频节目。"
  },
  {
    title: "Associated Press",
    category: "国际通讯社",
    url: "https://apnews.com/",
    level: "美国",
    aliases: ["美联社"],
    tags: ["英文", "主入口", "通讯社", "国际", "图片", "突发", "全球报道"],
    description: "美国通讯社主入口，覆盖世界新闻、政治、商业、图片和专题报道。"
  },
  {
    title: "BBC",
    category: "英国新闻",
    url: "https://www.bbc.com/",
    level: "英国 / 主入口",
    aliases: ["BBC News", "BBC新闻", "BBC中文网", "英国广播公司"],
    tags: ["英文", "主入口", "可切换语言", "英国", "全球", "地区", "解释性新闻"],
    description: "BBC 主入口，覆盖新闻、商业、文化、科技、视频与音频内容；同卡片提供中文网入口。",
    actions: [{ label: "中文网", url: "https://www.bbc.com/zhongwen/simp" }]
  },
  {
    title: "Al Jazeera",
    category: "中东新闻",
    url: "https://www.aljazeera.com/",
    level: "卡塔尔",
    aliases: ["半岛电视台"],
    tags: ["英文", "国际版", "中东", "国际", "全球南方", "视频", "评论"],
    description: "半岛电视台英文国际入口，适合追踪中东、全球南方、国际冲突、人道议题和深度报道。"
  },
  {
    title: "Deutsche Welle",
    category: "欧洲新闻",
    url: "https://www.dw.com/en/top-stories/s-9097",
    level: "德国",
    aliases: ["德国之声"],
    tags: ["英文", "国际版", "德国", "欧洲", "国际", "公共媒体", "多语种"],
    description: "德国之声英文新闻入口，适合追踪欧洲、德国外交、国际政治、社会议题和多语种新闻。",
    actions: [{ label: "主页", url: "https://www.dw.com/" }]
  },
  {
    title: "France 24",
    category: "欧洲新闻",
    url: "https://www.france24.com/en/",
    level: "法国",
    aliases: ["法国24"],
    tags: ["英文", "国际版", "法国", "欧洲", "国际", "公共媒体", "多语种"],
    description: "法国国际新闻频道英文入口，覆盖欧洲、非洲、中东和全球新闻；站内可切换法文、西文、阿文版本。"
  },
  {
    title: "NPR",
    category: "美国新闻",
    url: "https://www.npr.org/",
    level: "美国",
    aliases: ["美国国家公共电台"],
    tags: ["英文", "主入口", "美国", "公共媒体", "政治", "社会", "音频"],
    description: "美国公共广播主入口，偏美国国内公共议题，也覆盖国际新闻、文化、科技和音频内容。"
  },
  {
    title: "CBC News",
    category: "加拿大新闻",
    url: "https://www.cbc.ca/news",
    level: "加拿大",
    aliases: ["加拿大广播公司新闻"],
    tags: ["英文", "新闻页", "加拿大", "公共媒体", "北美", "国际"],
    description: "加拿大广播公司新闻页，偏加拿大国内政治、社会、经济，也覆盖北美和国际议题。"
  },
  {
    title: "ABC News Australia",
    category: "大洋洲新闻",
    url: "https://www.abc.net.au/news/",
    level: "澳大利亚",
    aliases: ["澳大利亚广播公司新闻"],
    tags: ["英文", "新闻页", "澳大利亚", "大洋洲", "公共媒体", "国际"],
    description: "澳大利亚广播公司新闻页，偏澳大利亚国内和大洋洲，也适合追踪印太和国际新闻。"
  },
  {
    title: "RFI 中文",
    category: "欧洲新闻",
    url: "https://www.rfi.fr/cn/",
    level: "法国",
    aliases: ["法广中文", "法国国际广播电台"],
    tags: ["中文", "国际版", "国际", "法国", "欧洲", "评论"],
    description: "法国国际广播电台中文入口，适合追踪欧洲视角的国际新闻、评论和专题。"
  },
  {
    title: "联合早报",
    category: "东南亚新闻",
    url: "https://www.zaobao.com.sg/",
    level: "新加坡",
    aliases: ["Zaobao", "早报"],
    tags: ["中文", "主入口", "新加坡", "东南亚", "国际", "评论", "华文媒体"],
    description: "新加坡华文综合媒体主入口，适合追踪新加坡、东南亚、中国与国际新闻及评论。"
  },
  {
    title: "中央社",
    category: "中国台湾新闻",
    url: "https://www.cna.com.tw/",
    level: "台湾",
    aliases: ["CNA", "中央通讯社"],
    tags: ["中文", "主入口", "台湾", "通讯社", "国际", "即时新闻"],
    description: "台湾中央通讯社中文入口，适合追踪台湾政治、社会、产业、国际与两岸新闻。",
    actions: [{ label: "英文", url: "https://focustaiwan.tw/" }]
  },
  {
    title: "联合新闻网",
    category: "中国台湾新闻",
    url: "https://udn.com/",
    level: "台湾",
    aliases: ["udn", "联合报"],
    tags: ["中文", "主入口", "台湾", "综合新闻", "政治", "财经", "评论"],
    description: "台湾联合报系新闻入口，适合追踪台湾时政、社会、财经、国际和评论。"
  },
  {
    title: "公视新闻网",
    category: "中国台湾新闻",
    url: "https://news.pts.org.tw/",
    level: "台湾",
    aliases: ["PTS News", "PNN", "公共电视新闻"],
    tags: ["中文", "新闻页", "台湾", "公共媒体", "影音", "国际", "深度"],
    description: "台湾公共电视新闻入口，适合查公共媒体视角的即时新闻、影音、专题和深度报道。"
  },
  {
    title: "Xinhua English",
    category: "国际通讯社",
    url: "https://english.news.cn/",
    level: "中国",
    aliases: ["新华社英文"],
    tags: ["英文", "国际版", "中国", "官方", "国际", "新华社", "通讯社"],
    description: "新华社英文入口，适合查中国官方英文新闻、国际传播、通讯社报道和英文政策表述。"
  },
  {
    title: "NHK WORLD-JAPAN",
    category: "东北亚新闻",
    url: "https://www3.nhk.or.jp/nhkworld/",
    level: "日本",
    aliases: ["NHK国际"],
    tags: ["英文", "国际版", "日本", "亚洲", "公共媒体", "国际", "视频"],
    description: "日本 NHK 国际服务主入口，适合追踪日本、东北亚、亚洲和全球新闻。"
  },
  {
    title: "Nikkei",
    category: "东北亚新闻",
    url: "https://www.nikkei.com/",
    level: "日本",
    aliases: ["日经", "日本经济新闻", "日经亚洲"],
    tags: ["日文", "主入口", "日本", "亚洲", "经济", "企业", "地缘政治"],
    description: "日本经济新闻社主入口，适合追踪日本经济、企业、市场与亚洲商业新闻；同卡片提供 Nikkei Asia 和日经中文网入口。",
    actions: [
      { label: "Nikkei Asia", url: "https://asia.nikkei.com/" },
      { label: "中文网", url: "https://zh.cn.nikkei.com/" }
    ]
  },
  {
    title: "Yonhap News Agency",
    category: "东北亚新闻",
    url: "https://en.yna.co.kr/",
    level: "韩国 / 通讯社",
    aliases: ["韩联社"],
    tags: ["英文", "国际版", "韩国", "东北亚", "通讯社", "政治", "经济"],
    description: "韩国代表性通讯社英文入口，适合追踪韩国国内政治、经济、外交和朝鲜半岛动态。",
    actions: [{ label: "韩文", url: "https://www.yna.co.kr/" }]
  },
  {
    title: "KBS WORLD",
    category: "东北亚新闻",
    url: "https://world.kbs.co.kr/service/news_today.htm?lang=e",
    level: "韩国 / 公共媒体",
    aliases: ["韩国广播公社国际台", "KBS国际广播"],
    tags: ["英文", "国际版", "韩国", "东北亚", "公共媒体", "朝鲜半岛", "多语种"],
    description: "韩国 KBS 国际服务新闻入口，适合追踪韩国政治、经济、社会、朝鲜半岛和国际新闻。",
    actions: [{ label: "KBS 韩文", url: "https://news.kbs.co.kr/" }]
  },
  {
    title: "Chosun Ilbo",
    category: "东北亚新闻",
    url: "https://www.chosun.com/",
    level: "韩国 / 主流报纸",
    aliases: ["朝鲜日报", "韩国朝鲜日报", "The Chosun Daily"],
    tags: ["韩文", "主入口", "韩国", "东北亚", "政治", "经济", "社会", "保守"],
    description: "韩国主要综合日报之一，适合追踪韩国国内政治、经济、社会和保守派舆论。",
    actions: [{ label: "English", url: "https://www.chosun.com/english/" }]
  },
  {
    title: "JoongAng Ilbo",
    category: "东北亚新闻",
    url: "https://www.joongang.co.kr/",
    level: "韩国 / 主流报纸",
    aliases: ["中央日报", "韩国中央日报", "Korea JoongAng Daily"],
    tags: ["韩文", "主入口", "韩国", "东北亚", "政治", "经济", "社会"],
    description: "韩国主要综合日报之一，适合追踪韩国政治、经济、社会和商业报道；英文版入口放在同一卡片。",
    actions: [{ label: "Korea JoongAng Daily", url: "https://www.koreajoongangdaily.com/" }]
  },
  {
    title: "The Korea Herald",
    category: "东北亚新闻",
    url: "https://www.koreaherald.com/",
    level: "韩国 / 英文",
    aliases: ["韩国先驱报"],
    tags: ["英文", "主入口", "韩国", "东北亚", "政治", "经济", "社会"],
    description: "韩国代表性英文日报，适合追踪韩国政治、经济、社会、文化和国际议题。"
  },
  {
    title: "The Korea Times",
    category: "东北亚新闻",
    url: "https://www.koreatimes.co.kr/",
    level: "韩国 / 英文",
    aliases: ["韩国时报"],
    tags: ["英文", "主入口", "韩国", "东北亚", "政治", "经济", "社会"],
    description: "韩国老牌英文日报，适合补充韩国国内新闻、经济、文化和国际报道。"
  },
  {
    title: "The Dong-A Ilbo",
    category: "东北亚新闻",
    url: "https://www.donga.com/",
    level: "韩国 / 主流报纸",
    aliases: ["东亚日报"],
    tags: ["韩文", "主入口", "韩国", "东北亚", "政治", "经济", "社会"],
    description: "韩国主要综合日报之一，适合追踪韩国国内政治、经济、社会和国际议题。",
    actions: [
      { label: "English", url: "https://www.donga.com/en/" },
      { label: "中文", url: "https://www.donga.com/cn/" }
    ]
  },
  {
    title: "Hankyoreh",
    category: "东北亚新闻",
    url: "https://www.hani.co.kr/",
    level: "韩国 / 主流报纸",
    aliases: ["韩民族日报"],
    tags: ["韩文", "主入口", "韩国", "东北亚", "政治", "社会", "进步"],
    description: "韩国代表性进步媒体，适合补充韩国社会议题、政治改革、劳工、性别和公共政策视角。",
    actions: [
      { label: "English", url: "https://english.hani.co.kr/" },
      { label: "中文", url: "https://china.hani.co.kr/" }
    ]
  },
  {
    title: "Korean Central News Agency",
    category: "东北亚新闻",
    url: "https://www.kcna.kp/en/",
    level: "朝鲜 / 官方通讯社",
    aliases: ["朝中社", "朝鲜中央通讯社", "KCNA"],
    tags: ["英文", "朝鲜", "DPRK", "东北亚", "官方", "通讯社", "政策表述"],
    description: "朝鲜官方通讯社英文入口，适合查阅朝鲜官方新闻、政策表述和外交声明；访问稳定性可能受网络影响。",
    actions: [
      { label: "中文", url: "https://www.kcna.kp/cn/" },
      { label: "KCNA Watch", url: "https://www.kcna.watch/" }
    ]
  },
  {
    title: "Rodong Sinmun",
    category: "东北亚新闻",
    url: "https://www.rodong.rep.kp/en/",
    level: "朝鲜 / 官方党报",
    aliases: ["劳动新闻"],
    tags: ["英文", "朝鲜", "DPRK", "东北亚", "官方", "党报"],
    description: "朝鲜劳动党中央机关报英文入口，适合查阅朝鲜官方立场和党报文本；访问稳定性可能受网络影响。"
  },
  {
    title: "NK News",
    category: "东北亚新闻",
    url: "https://www.nknews.org/",
    level: "朝鲜议题 / 专题媒体",
    aliases: ["朝鲜新闻"],
    tags: ["英文", "朝鲜", "DPRK", "东北亚", "独立媒体", "分析", "订阅"],
    description: "独立英文朝鲜专题媒体，适合追踪朝鲜动态、专家分析、卫星与开源资料，部分内容需要订阅。"
  },
  {
    title: "MONTSAME",
    category: "东北亚新闻",
    url: "https://www.montsame.mn/en/",
    level: "蒙古 / 通讯社",
    aliases: ["蒙通社", "蒙古国家通讯社"],
    tags: ["英文", "国际版", "蒙古", "东北亚", "通讯社", "政治", "经济"],
    description: "蒙古国家通讯社英文入口，适合追踪蒙古政治、经济、外交、矿业和区域议题。",
    actions: [{ label: "蒙古文", url: "https://montsame.mn/" }]
  },
  {
    title: "The UB Post",
    category: "东北亚新闻",
    url: "https://www.ubpost.mn/",
    level: "蒙古 / 英文",
    aliases: ["乌兰巴托邮报"],
    tags: ["英文", "主入口", "蒙古", "东北亚", "政治", "经济", "社会"],
    description: "蒙古英文新闻媒体，适合补充蒙古国内政治、经济、社会和文化报道。"
  },
  {
    title: "The Straits Times",
    category: "东南亚新闻",
    url: "https://www.straitstimes.com/",
    level: "新加坡",
    aliases: ["海峡时报", "新加坡海峡时报"],
    tags: ["英文", "主入口", "新加坡", "东南亚", "国际", "亚洲"],
    description: "新加坡海峡时报主入口，偏新加坡与东南亚，也适合追踪亚洲和国际议题。"
  },
  {
    title: "Channel NewsAsia",
    category: "东南亚新闻",
    url: "https://www.channelnewsasia.com/",
    level: "新加坡",
    aliases: ["亚洲新闻台", "CNA"],
    tags: ["英文", "主入口", "新加坡", "东南亚", "国际", "视频"],
    description: "CNA 主入口，覆盖新加坡、东南亚、亚洲和全球新闻，适合区域事件追踪。"
  },
  {
    title: "Malaysiakini",
    category: "东南亚新闻",
    url: "https://www.malaysiakini.com/",
    level: "马来西亚",
    aliases: ["当今大马"],
    tags: ["英文", "主入口", "马来西亚", "东南亚", "政治", "社会", "多语种"],
    description: "马来西亚新闻与评论主入口，偏本国政治和社会议题，也适合追踪东南亚动态。"
  },
  {
    title: "The Jakarta Post",
    category: "东南亚新闻",
    url: "https://www.thejakartapost.com/",
    level: "印度尼西亚",
    aliases: ["雅加达邮报"],
    tags: ["英文", "主入口", "印尼", "东南亚", "政治", "经济"],
    description: "印尼英文新闻主入口，偏印度尼西亚政治、经济和区域新闻。"
  },
  {
    title: "The Star Malaysia",
    category: "东南亚新闻",
    url: "https://www.thestar.com.my/",
    level: "马来西亚",
    aliases: ["星报", "马来西亚星报"],
    tags: ["英文", "主入口", "马来西亚", "东南亚", "商业", "社会"],
    description: "马来西亚综合新闻主入口，偏国内、商业、区域和国际新闻。"
  },
  {
    title: "Bangkok Post",
    category: "东南亚新闻",
    url: "https://www.bangkokpost.com/",
    level: "泰国",
    aliases: ["曼谷邮报"],
    tags: ["英文", "主入口", "泰国", "东南亚", "政治", "商业"],
    description: "泰国英文新闻主入口，偏泰国政治、经济、社会和区域动态。"
  },
  {
    title: "Rappler",
    category: "东南亚新闻",
    url: "https://www.rappler.com/",
    level: "菲律宾",
    tags: ["英文", "主入口", "菲律宾", "东南亚", "政治", "调查"],
    description: "菲律宾数字新闻平台主入口，偏菲律宾政治、社会、调查报道和区域议题。"
  },
  {
    title: "VnExpress International",
    category: "东南亚新闻",
    url: "https://e.vnexpress.net/",
    level: "越南 / 英文",
    aliases: ["越南快讯英文版"],
    tags: ["英文", "国际版", "越南", "东南亚", "经济", "社会", "ASEAN"],
    description: "越南 VnExpress 英文入口，适合追踪越南经济、社会、商业、区域和国际新闻。",
    actions: [{ label: "越文", url: "https://vnexpress.net/" }]
  },
  {
    title: "VietnamPlus",
    category: "东南亚新闻",
    url: "https://en.vietnamplus.vn/",
    level: "越南 / 英文",
    aliases: ["越通社新闻", "越南通讯社"],
    tags: ["英文", "国际版", "越南", "东南亚", "通讯社", "ASEAN", "中文"],
    description: "越南通讯社 VietnamPlus 英文入口，适合追踪越南官方视角、经济、外交和区域议题。",
    actions: [{ label: "中文", url: "https://zh.vietnamplus.vn/" }]
  },
  {
    title: "Thai PBS World",
    category: "东南亚新闻",
    url: "https://www.thaipbsworld.com/",
    level: "泰国 / 英文",
    aliases: ["泰国公共电视英文网"],
    tags: ["英文", "国际版", "泰国", "东南亚", "公共媒体", "政治", "经济"],
    description: "泰国公共电视英文新闻入口，适合追踪泰国政治、经济、社会和 ASEAN 相关议题。"
  },
  {
    title: "Laotian Times",
    category: "东南亚新闻",
    url: "https://laotiantimes.com/",
    level: "老挝 / 英文",
    aliases: ["老挝时报"],
    tags: ["英文", "主入口", "老挝", "东南亚", "经济", "社会", "区域"],
    description: "老挝英文新闻入口，适合补充老挝国内、经济、社会和区域合作议题。"
  },
  {
    title: "The Irrawaddy",
    category: "东南亚新闻",
    url: "https://www.irrawaddy.com/",
    level: "缅甸 / 英文",
    aliases: ["伊洛瓦底"],
    tags: ["英文", "主入口", "缅甸", "东南亚", "政治", "冲突", "独立媒体"],
    description: "缅甸独立媒体，适合追踪缅甸政治、冲突、族群、军政府与区域影响。"
  },
  {
    title: "Myanmar Now",
    category: "东南亚新闻",
    url: "https://myanmar-now.org/en/",
    level: "缅甸 / 英文",
    aliases: ["缅甸现在"],
    tags: ["英文", "国际版", "缅甸", "东南亚", "调查", "政治", "冲突"],
    description: "缅甸独立新闻机构英文入口，适合查缅甸政治、冲突、人权和调查报道。"
  },
  {
    title: "Frontier Myanmar",
    category: "东南亚新闻",
    url: "https://www.frontiermyanmar.net/en/homepage-us/",
    level: "缅甸 / 英文",
    aliases: ["前线缅甸"],
    tags: ["英文", "国际版", "缅甸", "东南亚", "深度报道", "商业", "政治"],
    description: "缅甸深度新闻与分析媒体，适合追踪缅甸政治、商业、人权和长期结构性问题。"
  },
  {
    title: "Phnom Penh Post",
    category: "东南亚新闻",
    url: "https://phnompenhpost.com/",
    level: "柬埔寨 / 英文",
    aliases: ["金边邮报"],
    tags: ["英文", "主入口", "柬埔寨", "东南亚", "政治", "经济", "社会"],
    description: "柬埔寨英文新闻入口，适合追踪柬埔寨政治、经济、社会和区域新闻。"
  },
  {
    title: "South China Morning Post",
    category: "中国香港新闻",
    url: "https://www.scmp.com/",
    level: "中国香港",
    aliases: ["南华早报"],
    tags: ["英文", "主入口", "中国", "香港", "亚洲", "商业"],
    description: "南华早报主入口，覆盖中国、亚洲、商业和国际新闻，部分内容可能需要订阅。"
  },
  {
    title: "The Economic Times",
    category: "南亚新闻",
    url: "https://economictimes.indiatimes.com/",
    level: "印度",
    aliases: ["经济时报", "印度经济时报"],
    tags: ["英文", "主入口", "印度", "财经", "商业", "市场"],
    description: "印度财经新闻主入口，适合追踪印度经济、企业、市场和政策动态。"
  },
  {
    title: "The Hindu",
    category: "南亚新闻",
    url: "https://www.thehindu.com/",
    level: "印度",
    aliases: ["印度教徒报"],
    tags: ["英文", "主入口", "印度", "亚洲", "政治", "经济", "社会"],
    description: "印度代表性英文报纸主入口，偏印度国内政治、经济、社会，也适合追踪南亚议题。"
  },
  {
    title: "The Diplomat",
    category: "亚太新闻",
    url: "https://thediplomat.com/",
    level: "美国",
    aliases: ["外交学者"],
    tags: ["英文", "主入口", "美国", "亚太", "国际关系", "安全", "外交"],
    description: "美国国际事务媒体，聚焦亚太外交、安全和政治分析，适合国际关系与区域研究。"
  },
  {
    title: "Al Arabiya English",
    category: "中东新闻",
    url: "https://english.alarabiya.net/",
    level: "沙特 / 阿联酋",
    aliases: ["阿拉比亚电视台英文"],
    tags: ["英文", "国际版", "中东", "海湾", "国际", "能源", "政治"],
    description: "阿拉比亚英文入口，偏中东和海湾国家视角，适合追踪能源、地区政治和国际新闻。"
  },
  {
    title: "Le Monde",
    category: "欧洲新闻",
    url: "https://www.lemonde.fr/",
    level: "法国",
    aliases: ["世界报", "法国世界报"],
    tags: ["法文", "主入口", "法国", "欧洲", "国际", "政治", "评论"],
    description: "法国代表性日报主入口，偏法国国内与欧洲事务，也适合追踪国际新闻和评论。"
  },
  {
    title: "El Pais",
    category: "欧洲新闻",
    url: "https://elpais.com/",
    level: "西班牙",
    aliases: ["国家报", "西班牙国家报"],
    tags: ["西文", "主入口", "西班牙", "欧洲", "拉美", "国际", "评论"],
    description: "西班牙代表性媒体主入口，偏西班牙与欧洲，也适合追踪拉美和国际议题。"
  },
  {
    title: "Folha de S.Paulo",
    category: "拉美新闻",
    url: "https://www.folha.uol.com.br/",
    level: "巴西",
    aliases: ["圣保罗页报"],
    tags: ["葡文", "主入口", "巴西", "拉美", "政治", "经济", "社会"],
    description: "巴西代表性报纸主入口，偏巴西政治、经济、社会，也适合追踪拉美议题。"
  },
  {
    title: "Daily Nation",
    category: "非洲新闻",
    url: "https://nation.africa/",
    level: "肯尼亚",
    tags: ["英文", "主入口", "肯尼亚", "东非", "非洲", "政治", "商业"],
    description: "肯尼亚和东非代表性媒体主入口，偏肯尼亚与东非，也适合追踪非洲政治经济和社会新闻。"
  },
  {
    title: "Mail & Guardian",
    category: "非洲新闻",
    url: "https://mg.co.za/",
    level: "南非",
    aliases: ["邮报与卫报"],
    tags: ["英文", "主入口", "南非", "非洲", "政治", "调查", "评论"],
    description: "南非代表性新闻媒体主入口，偏南非政治和非洲议题，也适合查调查报道和评论。"
  },
  {
    title: "GDELT",
    category: "新闻数据与数据库",
    url: "https://www.gdeltproject.org/",
    level: "开放数据",
    tags: ["新闻数据", "事件数据", "文本", "全球", "舆情"],
    description: "全球新闻事件和文本数据，适合事件研究、舆情分析和文本挖掘。"
  },
  {
    title: "Factiva",
    category: "新闻数据与数据库",
    url: "https://global.factiva.com/",
    level: "订阅",
    tags: ["新闻数据库", "商业", "文本", "档案", "企业"],
    description: "全球新闻和商业信息数据库，适合新闻文本和企业事件研究，通常需机构订阅。"
  },
  {
    title: "Nexis Uni",
    category: "新闻数据与数据库",
    url: "https://advance.lexis.com/",
    level: "订阅",
    tags: ["新闻数据库", "法律", "文本", "档案", "政策"],
    description: "新闻、法律与商业数据库，适合政策事件、法律文本和媒体档案检索，通常需机构订阅。"
  }
];

const governmentSites = [
  {
    title: "中国政府网",
    category: "中国大陆政府",
    url: "https://www.gov.cn/",
    level: "国家门户",
    tags: ["中文", "中国", "国务院", "政策", "法规", "公报", "政府文件"],
    description: "中国中央政府门户，适合核对国务院政策、政府公报、政策文件、会议和新闻发布。"
  },
  {
    title: "中华人民共和国外交部",
    category: "中国大陆政府",
    url: "https://www.mfa.gov.cn/",
    level: "外交部",
    aliases: ["中国外交部"],
    tags: ["中文", "英文", "中国", "外交", "声明", "发言人", "条约"],
    description: "中国外交政策、例行记者会、声明、公报和国别地区信息入口。"
  },
  {
    title: "中华人民共和国商务部",
    category: "中国大陆政府",
    url: "https://www.mofcom.gov.cn/",
    level: "商务部",
    aliases: ["商务部"],
    tags: ["中文", "中国", "贸易", "投资", "外资", "经贸", "政策"],
    description: "中国贸易、外资、对外投资、区域经贸合作和商务政策官方入口。"
  },
  {
    title: "国家统计局",
    category: "中国大陆政府",
    url: "https://www.stats.gov.cn/",
    level: "统计",
    tags: ["中文", "中国", "统计", "宏观", "人口", "经济数据", "年鉴"],
    description: "中国官方统计数据、统计公报、统计年鉴和宏观经济指标入口。"
  },
  {
    title: "国家发展和改革委员会",
    category: "中国大陆政府",
    url: "https://www.ndrc.gov.cn/",
    level: "宏观政策",
    aliases: ["国家发改委", "NDRC"],
    tags: ["中文", "中国", "宏观", "产业", "区域", "发展规划", "政策"],
    description: "中国宏观调控、发展规划、产业政策、区域协调和价格政策入口。"
  },
  {
    title: "海关总署",
    category: "中国大陆政府",
    url: "http://www.customs.gov.cn/",
    level: "海关",
    aliases: ["中国海关"],
    tags: ["中文", "中国", "海关", "贸易", "进出口", "统计"],
    description: "中国海关政策、进出口监管、贸易统计和口岸信息入口。"
  },
  {
    title: "香港特别行政区政府",
    category: "中国港澳台政府",
    url: "https://www.gov.hk/",
    level: "官方门户",
    aliases: ["香港政府"],
    tags: ["中文", "英文", "香港", "政府门户", "政策", "统计"],
    description: "香港特区政府官方门户，适合查政策、公告、公共服务和统计入口。"
  },
  {
    title: "澳门特别行政区政府",
    category: "中国港澳台政府",
    url: "https://www.gov.mo/",
    level: "官方门户",
    aliases: ["澳门政府"],
    tags: ["中文", "葡文", "澳门", "政府门户", "政策"],
    description: "澳门特区政府官方门户，适合查政府公告、政策和公共服务信息。"
  },
  {
    title: "台湾行政院",
    category: "中国港澳台政府",
    url: "https://www.ey.gov.tw/",
    level: "行政机构",
    aliases: ["行政院"],
    tags: ["中文", "台湾", "政策", "行政", "新闻"],
    description: "台湾行政机构入口，适合查政策说明、行政新闻和专题资料。"
  },
  {
    title: "台湾外事部门",
    category: "中国港澳台政府",
    url: "https://www.mofa.gov.tw/",
    level: "外事",
    aliases: ["台湾外交部", "MOFA Taiwan"],
    tags: ["中文", "英文", "台湾", "外交", "声明", "国际关系"],
    description: "台湾外事政策、声明、新闻和国际参与信息入口。"
  },
  {
    title: "美国白宫",
    category: "美国政府",
    url: "https://www.whitehouse.gov/",
    level: "总统府",
    aliases: ["White House"],
    tags: ["英文", "美国", "总统", "行政令", "国家安全", "科技政策", "声明"],
    description: "美国总统政策、行政令、事实清单、国家安全和科技政策发布入口。"
  },
  {
    title: "U.S. Department of State",
    category: "美国政府",
    url: "https://www.state.gov/",
    level: "外交部",
    aliases: ["美国国务院", "State Department"],
    tags: ["英文", "美国", "外交", "国别", "声明", "制裁", "安全"],
    description: "美国外交政策、国别资料、声明、条约和地区事务官方入口。"
  },
  {
    title: "U.S. Department of Commerce",
    category: "美国政府",
    url: "https://www.commerce.gov/",
    level: "商务部",
    aliases: ["美国商务部"],
    tags: ["英文", "美国", "商务", "产业", "出口管制", "技术", "半导体"],
    description: "美国商务、产业、技术、出口管制和国际贸易相关政策入口。"
  },
  {
    title: "Office of the U.S. Trade Representative",
    category: "美国政府",
    url: "https://ustr.gov/",
    level: "贸易代表",
    aliases: ["USTR", "美国贸易代表办公室"],
    tags: ["英文", "美国", "贸易", "关税", "协定", "WTO", "供应链"],
    description: "美国贸易政策、贸易协定、关税争端和 WTO 事务官方入口。"
  },
  {
    title: "U.S. Department of the Treasury",
    category: "美国政府",
    url: "https://home.treasury.gov/",
    level: "财政部",
    aliases: ["美国财政部", "Treasury", "Office of Economic Policy"],
    tags: ["英文", "美国", "财政", "制裁", "金融", "宏观", "投资安全", "经济政策", "美国政府经济学家"],
    description: "美国财政、制裁、宏观经济、金融监管和投资安全政策入口，附经济政策研究与报告入口。",
    actions: [
      { label: "经济政策", url: "https://home.treasury.gov/about/offices/economic-policy" },
      { label: "研究报告", url: "https://home.treasury.gov/policy-issues/economic-policy/economic-policy-reports/" }
    ]
  },
  {
    title: "NIST",
    category: "美国政府",
    url: "https://www.nist.gov/",
    level: "标准与技术",
    aliases: ["美国国家标准与技术研究院"],
    tags: ["英文", "美国", "标准", "技术", "AI", "网络安全", "测量"],
    description: "美国标准、技术、AI 风险管理、网络安全框架和测量科学官方入口。"
  },
  {
    title: "U.S. Census Bureau",
    category: "美国政府",
    url: "https://www.census.gov/",
    level: "统计",
    aliases: ["美国人口普查局", "Census Bureau"],
    tags: ["英文", "美国", "统计", "人口", "贸易", "地区数据", "企业", "微观数据", "美国政府经济学家"],
    description: "美国人口、家庭、地区、企业和贸易统计入口，附经济研究中心与受限微观数据目录。",
    actions: [
      { label: "CES研究", url: "https://www.census.gov/programs-surveys/ces.html" },
      { label: "受限数据", url: "https://www.census.gov/topics/research/guidance/restricted-use-microdata.html" }
    ]
  },
  {
    title: "Federal Reserve / 美联储研究",
    category: "美国政府",
    url: "https://www.federalreserve.gov/econres.htm",
    level: "中央银行 / 经济研究",
    aliases: ["美联储", "联邦储备系统", "Federal Reserve System", "Board of Governors", "美联储理事会"],
    tags: ["英文", "美国", "宏观经济", "货币政策", "金融", "工作论文", "美国政府经济学家"],
    description: "美联储理事会经济研究入口，汇集工作论文、研究札记、数据和模型，附研究人员及 12 家地区联储目录。",
    actions: [
      { label: "研究人员", url: "https://www.federalreserve.gov/econres/researchers.htm" },
      { label: "地区联储", url: "https://www.federalreserve.gov/aboutthefed/federal-reserve-system.htm" }
    ]
  },
  {
    title: "Census CES / 人口普查局经济研究中心",
    category: "美国政府",
    url: "https://www.census.gov/programs-surveys/ces.html",
    level: "政府研究中心",
    aliases: ["Center for Economic Studies", "CES", "美国人口普查局经济研究中心"],
    tags: ["英文", "美国", "经验研究", "劳动经济学", "企业", "行政记录", "美国政府经济学家"],
    description: "美国人口普查局的经济研究中心，利用企业与家庭微观数据开展研究，并开发和改进统计数据产品。",
    actions: [
      { label: "研究成果", url: "https://www.census.gov/programs-surveys/ces/research.html" },
      { label: "数据产品", url: "https://www.census.gov/programs-surveys/ces/data.html" }
    ]
  },
  {
    title: "BLS / 美国劳工统计局",
    category: "美国政府",
    url: "https://www.bls.gov/",
    level: "劳动与价格统计",
    aliases: ["Bureau of Labor Statistics", "U.S. Bureau of Labor Statistics"],
    tags: ["英文", "美国", "劳动经济学", "就业", "失业", "工资", "美国政府经济学家", "价格", "生产率"],
    description: "美国就业、失业、工资、价格和生产率统计入口，同时发布研究论文；部分机密数据需通过研究申请访问。",
    actions: [
      { label: "研究论文", url: "https://www.bls.gov/osmr/research-papers/home.htm" },
      { label: "数据申请", url: "https://www.bls.gov/rda/" }
    ]
  },
  {
    title: "BEA / 美国经济分析局",
    category: "美国政府",
    url: "https://www.bea.gov/",
    level: "国民账户与经济测量",
    aliases: ["Bureau of Economic Analysis", "U.S. Bureau of Economic Analysis"],
    tags: ["英文", "美国", "GDP", "国民账户", "数字经济", "经济测量", "美国政府经济学家", "无形资产", "收入分配"],
    description: "美国 GDP、收入、产业及国际经济账户官方入口，可查经济测量、数字化、无形资产等领域的研究论文和研究人员。",
    actions: [
      { label: "研究论文", url: "https://www.bea.gov/research" },
      { label: "研究人员", url: "https://www.bea.gov/research/meet-the-researchers" }
    ]
  },
  {
    title: "CBO / 美国国会预算办公室",
    category: "美国政府",
    url: "https://www.cbo.gov/",
    level: "预算与经济分析",
    aliases: ["Congressional Budget Office", "国会预算局", "Macroeconomic Analysis Division"],
    tags: ["英文", "美国", "财政政策", "预算", "经济预测", "联邦债务", "美国政府经济学家", "税收"],
    description: "面向美国国会提供预算与经济分析，发布经济预测、政策成本估算、工作论文及配套数据。",
    actions: [
      { label: "分析报告", url: "https://www.cbo.gov/about/products" },
      { label: "预测数据", url: "https://www.cbo.gov/data/budget-economic-data" }
    ]
  },
  {
    title: "USDA / 美国农业部",
    category: "美国政府",
    url: "https://www.usda.gov/",
    level: "农业部",
    aliases: ["U.S. Department of Agriculture", "United States Department of Agriculture"],
    tags: ["英文", "美国", "农业", "食品", "农村", "农业政策", "美国政府经济学家"],
    description: "美国农业、食品与农村政策官方门户，附下属经济研究局的农业和农村经济研究入口。",
    actions: [
      { label: "ERS研究", url: "https://ers.usda.gov/" }
    ]
  },
  {
    title: "USDA ERS / 农业部经济研究局",
    category: "美国政府",
    url: "https://ers.usda.gov/",
    level: "政府经济研究机构",
    aliases: ["Economic Research Service", "ERS", "美国农业部经济研究局"],
    tags: ["英文", "美国", "农业经济", "食品", "农村经济", "环境", "美国政府经济学家"],
    description: "美国农业部经济研究机构，发布农业、食品、农村和环境研究，提供农场收入、食品价格等数据产品。",
    actions: [
      { label: "数据产品", url: "https://www.ers.usda.gov/data-products" }
    ]
  },
  {
    title: "CEA / 美国总统经济顾问委员会",
    category: "美国政府",
    url: "https://www.whitehouse.gov/cea/",
    level: "总统经济咨询机构",
    aliases: ["Council of Economic Advisers", "总统经济顾问委员会"],
    tags: ["英文", "美国", "经济政策", "宏观经济", "经济报告", "政策研究", "美国政府经济学家"],
    description: "为美国总统提供经济政策分析和建议，发布研究报告、总统经济报告及相关机构信息。",
    actions: [
      { label: "报告与人员", url: "https://www.whitehouse.gov/cea/information-resources/" }
    ]
  },
  {
    title: "日本首相官邸",
    category: "日本政府",
    url: "https://japan.kantei.go.jp/",
    level: "首相府",
    aliases: ["Prime Minister of Japan", "Kantei"],
    tags: ["英文", "日本", "首相", "政策", "声明", "国家战略"],
    description: "日本首相和内阁政策、声明、演讲和国家战略英文入口。"
  },
  {
    title: "日本外务省",
    category: "日本政府",
    url: "https://www.mofa.go.jp/",
    level: "外交部",
    aliases: ["MOFA Japan"],
    tags: ["英文", "日本", "外交", "国别", "安全", "声明", "援助"],
    description: "日本外交政策、国别地区、国际合作、安全和政府声明入口。"
  },
  {
    title: "日本经济产业省",
    category: "日本政府",
    url: "https://www.meti.go.jp/english/",
    level: "经济产业",
    aliases: ["METI"],
    tags: ["英文", "日本", "产业", "贸易", "AI", "半导体", "经济安全"],
    description: "日本产业政策、贸易、经济安全、AI、半导体和能源政策英文入口。"
  },
  {
    title: "日本总务省",
    category: "日本政府",
    url: "https://www.soumu.go.jp/english/",
    level: "总务",
    aliases: ["MIC Japan"],
    tags: ["英文", "日本", "ICT", "通信", "统计", "行政"],
    description: "日本 ICT、通信、行政、地方自治和统计相关政策入口。"
  },
  {
    title: "日本统计局",
    category: "日本政府",
    url: "https://www.stat.go.jp/english/",
    level: "统计",
    tags: ["英文", "日本", "统计", "人口", "经济数据", "官方数据"],
    description: "日本人口、经济、社会和地区统计官方英文入口。"
  },
  {
    title: "韩国总统府",
    category: "韩国政府",
    url: "https://en.president.go.kr/",
    level: "总统府",
    aliases: ["President of Korea"],
    tags: ["英文", "韩国", "总统", "声明", "国家战略", "政策"],
    description: "韩国总统声明、政策讲话和国家战略英文入口。"
  },
  {
    title: "韩国外交部",
    category: "韩国政府",
    url: "https://www.mofa.go.kr/eng/index.do",
    level: "外交部",
    aliases: ["MOFA Korea"],
    tags: ["英文", "韩国", "外交", "声明", "国别", "安全"],
    description: "韩国外交政策、声明、国别地区和国际合作官方英文入口。"
  },
  {
    title: "韩国科学技术信息通信部",
    category: "韩国政府",
    url: "https://www.msit.go.kr/eng/index.do",
    level: "科技政策",
    aliases: ["MSIT", "韩国科技部"],
    tags: ["英文", "韩国", "AI", "科技", "ICT", "数字政策", "半导体"],
    description: "韩国 AI、ICT、数字政策、科研和科技产业官方英文入口。"
  },
  {
    title: "韩国产业通商资源部",
    category: "韩国政府",
    url: "https://english.motie.go.kr/",
    level: "产业与贸易",
    aliases: ["MOTIE"],
    tags: ["英文", "韩国", "产业", "贸易", "能源", "供应链", "半导体"],
    description: "韩国产业、贸易、能源、供应链和经济安全相关政策入口。"
  },
  {
    title: "KOSIS",
    category: "韩国政府",
    url: "https://kosis.kr/eng/",
    level: "统计",
    aliases: ["Korean Statistical Information Service"],
    tags: ["英文", "韩国", "统计", "宏观", "人口", "官方数据"],
    description: "韩国官方统计信息服务，适合查宏观、人口、社会和行业统计。"
  },
  {
    title: "ASEAN Secretariat",
    category: "东盟与东南亚政府",
    url: "https://asean.org/",
    level: "区域组织",
    aliases: ["东盟秘书处"],
    tags: ["英文", "ASEAN", "东盟", "东南亚", "声明", "文件", "区域合作"],
    description: "东盟官方入口，适合查声明、峰会、法律文件、区域合作和专题资料。"
  },
  {
    title: "ASEANstats",
    category: "东盟与东南亚政府",
    url: "https://data.aseanstats.org/",
    level: "区域统计",
    aliases: ["ASEANstats Data Portal"],
    tags: ["英文", "ASEAN", "东盟", "东南亚", "统计", "贸易", "FDI"],
    description: "东盟官方统计门户，覆盖宏观、贸易、FDI、旅游、人口和 SDG 指标。"
  },
  {
    title: "Singapore Government",
    category: "东盟与东南亚政府",
    url: "https://www.gov.sg/",
    level: "官方门户",
    aliases: ["新加坡政府"],
    tags: ["英文", "新加坡", "政府门户", "政策", "新闻"],
    description: "新加坡政府门户，适合查政策、新闻、公民服务和官方专题。"
  },
  {
    title: "Singapore Department of Statistics",
    category: "东盟与东南亚政府",
    url: "https://www.singstat.gov.sg/",
    level: "统计",
    aliases: ["SingStat"],
    tags: ["英文", "新加坡", "统计", "宏观", "人口", "贸易"],
    description: "新加坡官方统计入口，适合查宏观、人口、贸易、产业和社会数据。"
  },
  {
    title: "Indonesia Government Portal",
    category: "东盟与东南亚政府",
    url: "https://www.indonesia.go.id/",
    level: "官方门户",
    aliases: ["印尼政府门户"],
    tags: ["印尼文", "英文", "印度尼西亚", "印尼", "政府门户", "政策"],
    description: "印度尼西亚政府门户，适合查官方政策、新闻、公共服务和国别信息。"
  },
  {
    title: "Indonesia Ministry of Foreign Affairs",
    category: "东盟与东南亚政府",
    url: "https://kemlu.go.id/",
    level: "外交部",
    aliases: ["印尼外交部", "Kemlu"],
    tags: ["英文", "印度尼西亚", "印尼", "外交", "声明", "东盟"],
    description: "印度尼西亚外交政策、声明、双多边关系和领事信息入口。"
  },
  {
    title: "BPS Statistics Indonesia",
    category: "东盟与东南亚政府",
    url: "https://www.bps.go.id/en",
    level: "统计",
    aliases: ["印尼统计局"],
    tags: ["英文", "印度尼西亚", "印尼", "统计", "宏观", "人口"],
    description: "印度尼西亚官方统计入口，适合查宏观、人口、地区、贸易和产业数据。"
  },
  {
    title: "Vietnam Government News",
    category: "东盟与东南亚政府",
    url: "https://en.baochinhphu.vn/",
    level: "政府新闻",
    aliases: ["越南政府新闻网"],
    tags: ["英文", "越南", "政府", "政策", "新闻", "声明"],
    description: "越南政府英文新闻入口，适合查政策动态、政府会议和官方表态。"
  },
  {
    title: "Vietnam Ministry of Foreign Affairs",
    category: "东盟与东南亚政府",
    url: "https://www.mofa.gov.vn/en",
    level: "外交部",
    aliases: ["越南外交部"],
    tags: ["英文", "越南", "外交", "声明", "国别", "东盟"],
    description: "越南外交政策、声明、国别关系和国际合作入口。"
  },
  {
    title: "General Statistics Office of Vietnam",
    category: "东盟与东南亚政府",
    url: "https://www.gso.gov.vn/en/homepage/",
    level: "统计",
    aliases: ["越南统计总局"],
    tags: ["英文", "越南", "统计", "宏观", "人口", "贸易"],
    description: "越南官方统计入口，适合查宏观经济、人口、产业和贸易数据。"
  },
  {
    title: "Royal Thai Government",
    category: "东盟与东南亚政府",
    url: "https://www.thaigov.go.th/",
    level: "官方门户",
    aliases: ["泰国政府"],
    tags: ["英文", "泰国", "政府门户", "政策", "新闻"],
    description: "泰国政府门户，适合查政府新闻、政策和官方声明。"
  },
  {
    title: "Thailand Ministry of Foreign Affairs",
    category: "东盟与东南亚政府",
    url: "https://www.mfa.go.th/en",
    level: "外交部",
    aliases: ["泰国外交部"],
    tags: ["英文", "泰国", "外交", "声明", "东盟"],
    description: "泰国外交政策、声明、双多边关系和国际合作入口。"
  },
  {
    title: "NESDC Thailand",
    category: "东盟与东南亚政府",
    url: "https://www.nesdc.go.th/main.php?filename=index",
    level: "规划与发展",
    aliases: ["泰国国家经济和社会发展委员会"],
    tags: ["英文", "泰国", "发展规划", "经济", "统计", "政策"],
    description: "泰国经济社会发展规划、宏观分析、政策报告和数据入口。"
  },
  {
    title: "Malaysia Government Portal",
    category: "东盟与东南亚政府",
    url: "https://www.malaysia.gov.my/",
    level: "官方门户",
    aliases: ["马来西亚政府"],
    tags: ["英文", "马来西亚", "政府门户", "政策", "公共服务"],
    description: "马来西亚政府门户，适合查官方服务、政策入口和机构链接。"
  },
  {
    title: "Malaysia Ministry of Investment, Trade and Industry",
    category: "东盟与东南亚政府",
    url: "https://www.miti.gov.my/",
    level: "投资贸易产业",
    aliases: ["MITI Malaysia", "马来西亚投资贸易与工业部"],
    tags: ["英文", "马来西亚", "贸易", "投资", "产业", "政策"],
    description: "马来西亚投资、贸易、产业政策和国际经贸合作入口。"
  },
  {
    title: "Department of Statistics Malaysia",
    category: "东盟与东南亚政府",
    url: "https://www.dosm.gov.my/",
    level: "统计",
    aliases: ["DOSM"],
    tags: ["英文", "马来西亚", "统计", "宏观", "人口", "贸易"],
    description: "马来西亚官方统计入口，适合查宏观、人口、产业和地区数据。"
  },
  {
    title: "Official Gazette of the Philippines",
    category: "东盟与东南亚政府",
    url: "https://www.officialgazette.gov.ph/",
    level: "官方公报",
    aliases: ["菲律宾官方公报"],
    tags: ["英文", "菲律宾", "政府", "公报", "法规", "政策"],
    description: "菲律宾官方公报，适合查总统文件、法规、声明和政府公告。"
  },
  {
    title: "Philippine Statistics Authority",
    category: "东盟与东南亚政府",
    url: "https://psa.gov.ph/",
    level: "统计",
    aliases: ["PSA Philippines"],
    tags: ["英文", "菲律宾", "统计", "人口", "宏观", "贸易"],
    description: "菲律宾官方统计入口，适合查人口、宏观、贸易、社会和地区数据。"
  },
  {
    title: "Cambodia Ministry of Foreign Affairs",
    category: "东盟与东南亚政府",
    url: "https://www.mfaic.gov.kh/",
    level: "外交部",
    aliases: ["柬埔寨外交部"],
    tags: ["英文", "柬埔寨", "外交", "声明", "东盟"],
    description: "柬埔寨外交政策、声明、领事和国际合作入口。"
  },
  {
    title: "Laos Ministry of Foreign Affairs",
    category: "东盟与东南亚政府",
    url: "https://www.mofa.gov.la/",
    level: "外交部",
    aliases: ["老挝外交部"],
    tags: ["英文", "老挝", "外交", "声明", "东盟"],
    description: "老挝外交政策、新闻、声明和国际合作入口。"
  },
  {
    title: "Brunei Prime Minister's Office",
    category: "东盟与东南亚政府",
    url: "https://www.pmo.gov.bn/",
    level: "首相府",
    aliases: ["文莱首相府"],
    tags: ["英文", "文莱", "政府", "政策", "新闻"],
    description: "文莱首相府入口，适合查政府新闻、政策和官方机构信息。"
  },
  {
    title: "Myanmar Ministry of Foreign Affairs",
    category: "东盟与东南亚政府",
    url: "https://www.mofa.gov.mm/",
    level: "外交部",
    aliases: ["缅甸外交部"],
    tags: ["英文", "缅甸", "外交", "声明", "东盟"],
    description: "缅甸外交部官方入口，适合查官方声明和国际关系信息。"
  },
  {
    title: "GOV.UK",
    category: "欧洲与英国政府",
    url: "https://www.gov.uk/",
    level: "国家门户",
    aliases: ["英国政府"],
    tags: ["英文", "英国", "政府门户", "政策", "法规", "统计"],
    description: "英国政府统一门户，适合查政策、法规、部门文件和官方统计入口。"
  },
  {
    title: "UK Foreign, Commonwealth & Development Office",
    category: "欧洲与英国政府",
    url: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office",
    level: "外交部",
    aliases: ["FCDO", "英国外交部"],
    tags: ["英文", "英国", "外交", "发展", "声明", "制裁"],
    description: "英国外交、发展政策、国别资料、制裁和声明入口。"
  },
  {
    title: "European Commission",
    category: "欧洲与英国政府",
    url: "https://commission.europa.eu/",
    level: "欧盟机构",
    aliases: ["欧盟委员会"],
    tags: ["英文", "欧盟", "政策", "法规", "贸易", "数字政策"],
    description: "欧盟委员会政策、法规、新闻、贸易、数字和产业政策入口。"
  },
  {
    title: "Eurostat",
    category: "欧洲与英国政府",
    url: "https://ec.europa.eu/eurostat",
    level: "统计",
    aliases: ["欧盟统计局"],
    tags: ["英文", "欧盟", "统计", "宏观", "人口", "贸易"],
    description: "欧盟官方统计入口，适合查成员国可比统计数据。"
  },
  {
    title: "Australia DFAT",
    category: "大洋洲与加拿大政府",
    url: "https://www.dfat.gov.au/",
    level: "外交贸易",
    aliases: ["澳大利亚外交贸易部"],
    tags: ["英文", "澳大利亚", "外交", "贸易", "印太", "发展援助"],
    description: "澳大利亚外交、贸易、印太政策、发展援助和国别资料入口。"
  },
  {
    title: "Australian Bureau of Statistics",
    category: "大洋洲与加拿大政府",
    url: "https://www.abs.gov.au/",
    level: "统计",
    aliases: ["澳大利亚统计局"],
    tags: ["英文", "澳大利亚", "统计", "人口", "经济", "地区数据"],
    description: "澳大利亚官方统计入口，适合查人口、经济、产业和地区数据。"
  },
  {
    title: "Global Affairs Canada",
    category: "大洋洲与加拿大政府",
    url: "https://www.international.gc.ca/",
    level: "外交贸易",
    aliases: ["加拿大全球事务部"],
    tags: ["英文", "法文", "加拿大", "外交", "贸易", "发展援助"],
    description: "加拿大外交、贸易、发展援助、制裁和国别政策入口。"
  },
  {
    title: "Statistics Canada",
    category: "大洋洲与加拿大政府",
    url: "https://www.statcan.gc.ca/en/start",
    level: "统计",
    aliases: ["加拿大统计局"],
    tags: ["英文", "法文", "加拿大", "统计", "人口", "经济"],
    description: "加拿大官方统计入口，适合查人口、经济、社会和产业数据。"
  },
  {
    title: "India Ministry of External Affairs",
    category: "南亚政府",
    url: "https://www.mea.gov.in/",
    level: "外交部",
    aliases: ["印度外交部"],
    tags: ["英文", "印度", "外交", "声明", "南亚", "印太"],
    description: "印度外交政策、声明、国别关系和国际合作入口。"
  },
  {
    title: "India Ministry of Statistics and Programme Implementation",
    category: "南亚政府",
    url: "https://www.mospi.gov.in/",
    level: "统计",
    aliases: ["印度统计部", "MOSPI"],
    tags: ["英文", "印度", "统计", "宏观", "人口", "官方数据"],
    description: "印度官方统计和项目实施入口，适合查宏观、社会和经济数据。"
  },
  {
    title: "United Nations",
    category: "多边与国际组织",
    url: "https://www.un.org/",
    level: "多边组织",
    aliases: ["联合国"],
    tags: ["英文", "中文", "联合国", "多边", "国际组织", "文件", "数据"],
    description: "联合国官方门户，适合查多边文件、会议、声明、机构和全球议题资料。"
  },
  {
    title: "UNDP / 联合国开发计划署",
    category: "多边与国际组织",
    url: "https://www.undp.org/",
    level: "联合国发展机构",
    aliases: ["United Nations Development Programme", "联合国开发计划署", "开发署"],
    tags: ["英文", "国际组织", "联合国体系", "人类发展", "减贫", "治理", "SDG"],
    description: "联合国发展合作机构，提供减贫、治理和可持续发展项目资料，附人类发展报告与 HDI 等指标入口。",
    actions: [{ label: "人类发展报告", url: "https://hdr.undp.org/" }]
  },
  {
    title: "UNCTAD / 联合国贸发会议",
    category: "多边与国际组织",
    url: "https://unctad.org/",
    level: "联合国贸易与发展机构",
    aliases: ["UN Trade and Development", "United Nations Conference on Trade and Development", "联合国贸易和发展会议", "联合国贸易和发展", "贸发会议"],
    tags: ["英文", "国际组织", "联合国体系", "贸易", "FDI", "数字经济", "发展中国家"],
    description: "贸易、投资与发展研究入口，适合查世界投资报告、数字经济、全球贸易及跨国可比统计。",
    actions: [{ label: "贸易投资数据", url: "https://unctadstat.unctad.org/datacentre/" }]
  },
  {
    title: "UN DESA / 联合国经济和社会事务部",
    category: "多边与国际组织",
    url: "https://www.un.org/en/desa/",
    level: "联合国秘书处部门",
    aliases: ["United Nations Department of Economic and Social Affairs", "UNDESA", "联合国经社部", "经济和社会事务部"],
    tags: ["英文", "国际组织", "联合国体系", "人口", "可持续发展", "社会发展", "SDG"],
    description: "联合国经济、社会和可持续发展政策资料入口，涵盖人口趋势、发展融资、公共治理和统计研究。",
    actions: [{ label: "人口展望", url: "https://population.un.org/wpp/" }]
  },
  {
    title: "ESCAP / 联合国亚太经社会",
    category: "多边与国际组织",
    url: "https://www.unescap.org/",
    level: "联合国区域委员会",
    aliases: ["UNESCAP", "United Nations Economic and Social Commission for Asia and the Pacific", "联合国亚洲及太平洋经济社会委员会", "亚太经社会"],
    tags: ["英文", "国际组织", "联合国体系", "亚太", "东南亚", "区域合作", "SDG"],
    description: "联合国亚太地区经济社会合作入口，提供区域经济展望、贸易、互联互通及可持续发展报告和统计。",
    actions: [{ label: "亚太数据", url: "https://data.unescap.org/" }]
  },
  {
    title: "ILO / 国际劳工组织",
    category: "多边与国际组织",
    url: "https://www.ilo.org/",
    level: "联合国专门机构",
    aliases: ["International Labour Organization", "国际劳工组织", "劳工组织", "ILOSTAT"],
    tags: ["英文", "国际组织", "联合国体系", "劳动", "就业", "工资", "社会保障"],
    description: "劳动标准、就业、工资和社会保障政策研究入口，附 ILOSTAT 跨国劳动力市场统计。",
    actions: [{ label: "劳工统计", url: "https://ilostat.ilo.org/" }]
  },
  {
    title: "WHO / 世界卫生组织",
    category: "多边与国际组织",
    url: "https://www.who.int/",
    level: "联合国专门机构",
    aliases: ["World Health Organization", "世界卫生组织", "世卫组织", "世卫"],
    tags: ["英文", "国际组织", "联合国体系", "卫生", "健康", "公共卫生", "疾病"],
    description: "全球公共卫生政策、健康报告与卫生统计入口，适合查国别健康指标、卫生系统和疾病相关资料。",
    actions: [{ label: "健康数据", url: "https://data.who.int/" }]
  },
  {
    title: "FAO / 联合国粮农组织",
    category: "多边与国际组织",
    url: "https://www.fao.org/",
    level: "联合国专门机构",
    aliases: ["Food and Agriculture Organization of the United Nations", "联合国粮食及农业组织", "粮农组织", "FAOSTAT"],
    tags: ["英文", "国际组织", "联合国体系", "农业", "粮食安全", "农村", "贸易"],
    description: "全球农业、粮食安全、林业与渔业政策和研究入口，附 FAOSTAT 农业生产、贸易与相关统计。",
    actions: [{ label: "农业统计", url: "https://www.fao.org/faostat/en/" }]
  },
  {
    title: "UNESCO / 联合国教科文组织",
    category: "多边与国际组织",
    url: "https://www.unesco.org/",
    level: "联合国专门机构",
    aliases: ["United Nations Educational, Scientific and Cultural Organization", "联合国教育科学及文化组织", "教科文组织", "UIS"],
    tags: ["英文", "国际组织", "联合国体系", "教育", "科学", "文化", "AI伦理"],
    description: "教育、科学、文化与信息传播政策入口，提供相关报告，附 UIS 国际可比教育、科学和文化统计。",
    actions: [{ label: "UIS统计", url: "https://www.uis.unesco.org/en" }]
  },
  {
    title: "UNICEF / 联合国儿童基金会",
    category: "多边与国际组织",
    url: "https://www.unicef.org/",
    level: "联合国基金",
    aliases: ["United Nations Children's Fund", "联合国儿童基金会", "儿基会"],
    tags: ["英文", "国际组织", "联合国体系", "儿童", "教育", "营养", "健康"],
    description: "儿童权利与发展资料入口，提供儿童健康、营养、教育、贫困和保护方面的研究与数据。",
    actions: [{ label: "儿童数据", url: "https://data.unicef.org/" }]
  },
  {
    title: "UNEP / 联合国环境规划署",
    category: "多边与国际组织",
    url: "https://www.unep.org/",
    level: "联合国环境机构",
    aliases: ["United Nations Environment Programme", "联合国环境规划署", "环境署"],
    tags: ["英文", "国际组织", "联合国体系", "环境", "气候", "生物多样性", "污染"],
    description: "全球环境治理与科学评估入口，适合查气候变化、生物多样性、污染治理和资源利用报告。",
    actions: [{ label: "报告资料", url: "https://www.unep.org/resources" }]
  },
  {
    title: "UNHCR / 联合国难民署",
    category: "多边与国际组织",
    url: "https://www.unhcr.org/",
    level: "联合国难民机构",
    aliases: ["United Nations High Commissioner for Refugees", "联合国难民事务高级专员公署", "联合国难民署", "难民署"],
    tags: ["英文", "国际组织", "联合国体系", "难民", "流离失所", "人道援助", "人口"],
    description: "难民保护、流离失所与人道援助资料入口，附难民、庇护申请者和相关人口统计。",
    actions: [{ label: "难民统计", url: "https://www.unhcr.org/refugee-statistics/" }]
  },
  {
    title: "WFP / 世界粮食计划署",
    category: "多边与国际组织",
    url: "https://www.wfp.org/",
    level: "联合国粮食援助机构",
    aliases: ["World Food Programme", "世界粮食计划署", "联合国世界粮食计划署", "粮食计划署"],
    tags: ["英文", "国际组织", "联合国体系", "粮食安全", "饥饿", "营养", "人道援助"],
    description: "粮食援助、饥饿与营养问题研究入口，提供国别报告、粮食安全评估和项目资料。",
    actions: [{ label: "研究报告", url: "https://www.wfp.org/publications" }]
  },
  {
    title: "UNIDO / 联合国工业发展组织",
    category: "多边与国际组织",
    url: "https://www.unido.org/",
    level: "联合国专门机构",
    aliases: ["United Nations Industrial Development Organization", "联合国工业发展组织", "工发组织"],
    tags: ["英文", "国际组织", "联合国体系", "工业化", "制造业", "产业政策", "绿色转型"],
    description: "包容和可持续工业发展研究入口，提供制造业、工业竞争力、产业转型报告与工业统计。",
    actions: [{ label: "工业统计", url: "https://stat.unido.org/" }]
  },
  {
    title: "ITU / 国际电信联盟",
    category: "多边与国际组织",
    url: "https://www.itu.int/",
    level: "联合国专门机构",
    aliases: ["International Telecommunication Union", "国际电信联盟", "国际电联"],
    tags: ["英文", "国际组织", "联合国体系", "ICT", "数字经济", "互联网", "通信"],
    description: "信息通信技术、数字发展和电信标准政策入口，附互联网普及、数字连通性和通信市场统计。",
    actions: [{ label: "ICT数据", url: "https://datahub.itu.int/" }]
  },
  {
    title: "WIPO / 世界知识产权组织",
    category: "多边与国际组织",
    url: "https://www.wipo.int/",
    level: "联合国专门机构",
    aliases: ["World Intellectual Property Organization", "世界知识产权组织", "知识产权组织", "GII"],
    tags: ["英文", "国际组织", "联合国体系", "知识产权", "专利", "创新", "技术"],
    description: "知识产权规则、专利与创新研究入口，附全球创新指数，适合查各经济体创新表现和比较资料。",
    actions: [{ label: "创新指数", url: "https://www.wipo.int/en/web/global-innovation-index" }]
  },
  {
    title: "IAEA / 国际原子能机构",
    category: "多边与国际组织",
    url: "https://www.iaea.org/",
    level: "联合国相关组织",
    aliases: ["International Atomic Energy Agency", "国际原子能机构"],
    tags: ["英文", "国际组织", "联合国体系", "核能", "核安全", "保障监督", "能源"],
    description: "核能和平利用、核安全与保障监督资料入口，提供技术报告、标准和研究出版物。",
    actions: [{ label: "出版物", url: "https://www.iaea.org/publications" }]
  },
  {
    title: "ADB / 亚洲开发银行",
    category: "多边与国际组织",
    url: "https://www.adb.org/",
    level: "多边开发银行",
    aliases: ["Asian Development Bank", "亚洲开发银行", "亚行"],
    tags: ["英文", "国际组织", "亚太", "东南亚", "发展融资", "基础设施", "区域合作"],
    description: "亚洲及太平洋地区发展融资机构，提供经济展望、国别研究和项目资料，附官方数据门户。",
    actions: [{ label: "数据门户", url: "https://data.adb.org/" }]
  },
  {
    title: "AIIB / 亚洲基础设施投资银行",
    category: "多边与国际组织",
    url: "https://www.aiib.org/",
    level: "多边开发银行",
    aliases: ["Asian Infrastructure Investment Bank", "亚洲基础设施投资银行", "亚投行"],
    tags: ["英文", "国际组织", "亚洲", "基础设施", "发展融资", "互联互通", "气候融资"],
    description: "多边基础设施融资机构，适合查投资项目、融资政策、项目文件和可持续基础设施研究。"
  },
  {
    title: "BIS / 国际清算银行",
    category: "多边与国际组织",
    url: "https://www.bis.org/",
    level: "国际金融机构",
    aliases: ["Bank for International Settlements", "国际清算银行", "国际结算银行"],
    tags: ["英文", "国际组织", "中央银行", "金融稳定", "银行监管", "信贷", "货币政策"],
    description: "中央银行合作与金融研究入口，提供工作论文、监管资料，以及跨境银行、信贷和债务证券统计。",
    actions: [{ label: "金融数据", url: "https://data.bis.org/" }]
  },
  {
    title: "IEA / 国际能源署",
    category: "多边与国际组织",
    url: "https://www.iea.org/",
    level: "政府间能源机构",
    aliases: ["International Energy Agency", "国际能源署"],
    tags: ["英文", "国际组织", "能源", "能源安全", "能源转型", "气候", "政策"],
    description: "全球能源市场与政策研究入口，提供能源展望、国别评估和统计；部分数据产品需要订阅。",
    actions: [{ label: "能源数据", url: "https://www.iea.org/data-and-statistics" }]
  },
  {
    title: "World Bank Data",
    category: "多边与国际组织",
    url: "https://data.worldbank.org/",
    level: "国际数据",
    aliases: ["世界银行数据", "世界银行", "World Bank", "World Bank Group"],
    tags: ["英文", "世界银行", "数据", "国家", "发展", "宏观", "指标"],
    description: "世界银行公开数据入口，适合国家面板、发展指标和宏观数据检索，附机构官网的报告、政策和项目资料。",
    actions: [{ label: "机构官网", url: "https://www.worldbank.org/" }]
  },
  {
    title: "IMF Data",
    category: "多边与国际组织",
    url: "https://www.imf.org/en/Data",
    level: "国际数据",
    aliases: ["国际货币基金组织数据", "国际货币基金组织", "International Monetary Fund"],
    tags: ["英文", "IMF", "数据", "宏观", "金融", "国际收支"],
    description: "IMF 宏观、金融、国际收支和财政数据入口，附机构官网的经济展望、国别报告和政策研究。",
    actions: [{ label: "机构官网", url: "https://www.imf.org/" }]
  },
  {
    title: "World Trade Organization",
    category: "多边与国际组织",
    url: "https://www.wto.org/",
    level: "贸易组织",
    aliases: ["WTO", "世界贸易组织"],
    tags: ["英文", "贸易", "WTO", "争端", "协定", "统计"],
    description: "WTO 官方入口，适合查贸易规则、争端、协定、成员资料和贸易统计。"
  },
  {
    title: "OECD Data",
    category: "多边与国际组织",
    url: "https://data.oecd.org/",
    level: "国际数据",
    aliases: ["经合组织数据", "经济合作与发展组织", "经合组织", "Organisation for Economic Co-operation and Development"],
    tags: ["英文", "OECD", "数据", "国家", "政策", "比较"],
    description: "OECD 可比数据入口，适合查成员与部分伙伴经济体指标，附机构官网的政策研究和国别报告。",
    actions: [{ label: "机构官网", url: "https://www.oecd.org/" }]
  }
];

const aiSources = [
  {
    title: "OpenAI",
    category: "前沿模型公司",
    url: "https://openai.com/news/",
    level: "美国 / 官方发布",
    aliases: ["ChatGPT", "OpenAI News"],
    tags: ["英文", "官方", "研究", "产品", "安全", "模型发布", "AGI"],
    description: "OpenAI 官方新闻与研究发布入口，适合核对模型、产品、安全、政策和重大研究公告原文。",
    actions: [
      { label: "NS方程公告", url: "https://openai.com/index/navier-stokes-solution/" },
      { label: "Research", url: "https://openai.com/research/" },
      { label: "API更新", url: "https://platform.openai.com/docs/changelog" }
    ]
  },
  {
    title: "Anthropic",
    category: "前沿模型公司",
    url: "https://www.anthropic.com/news",
    level: "美国 / 官方发布",
    aliases: ["Claude"],
    tags: ["英文", "官方", "Claude", "模型发布", "安全", "研究", "政策"],
    description: "Anthropic 官方新闻入口，适合追踪 Claude 模型、对齐安全、威胁情报、企业合作和政策表态。",
    actions: [{ label: "Claude Blog", url: "https://claude.com/blog" }]
  },
  {
    title: "Google DeepMind",
    category: "前沿模型公司",
    url: "https://deepmind.google/discover/blog/",
    level: "英国 / Google",
    aliases: ["DeepMind"],
    tags: ["英文", "官方", "Gemini", "研究", "模型发布", "科学AI", "安全"],
    description: "Google DeepMind 官方博客，适合追踪 Gemini、科学 AI、强化学习、多模态和安全研究发布。"
  },
  {
    title: "Google AI",
    category: "大型科技与云平台",
    url: "https://blog.google/technology/ai/",
    level: "美国 / Google",
    aliases: ["Google AI Blog", "Google AI"],
    tags: ["英文", "官方", "Google", "产品", "研究", "云平台", "Gemini"],
    description: "Google 官方 AI 新闻入口，偏产品、平台、公司战略和 Gemini 生态发布。"
  },
  {
    title: "Meta AI",
    category: "前沿模型公司",
    url: "https://ai.meta.com/blog/",
    level: "美国 / 官方发布",
    aliases: ["Facebook AI", "FAIR"],
    tags: ["英文", "官方", "Llama", "开源", "研究", "多模态", "产品"],
    description: "Meta AI 官方博客，适合追踪 Llama、开源模型、AI Research、产品化和多模态研究。"
  },
  {
    title: "Microsoft AI Blog",
    category: "大型科技与云平台",
    url: "https://blogs.microsoft.com/ai/",
    level: "美国 / Microsoft",
    aliases: ["微软AI", "Microsoft Blog"],
    tags: ["英文", "官方", "Microsoft", "Azure AI", "Copilot", "企业AI", "政策"],
    description: "微软 AI 官方博客入口，适合追踪 Copilot、Azure AI、企业应用、基础设施和负责任 AI。"
  },
  {
    title: "Mistral AI",
    category: "前沿模型公司",
    url: "https://mistral.ai/news/",
    level: "法国 / 官方发布",
    aliases: ["Mistral"],
    tags: ["英文", "官方", "欧洲", "开源权重", "模型发布", "企业AI", "研究"],
    description: "Mistral 官方新闻入口，适合追踪欧洲前沿模型、开源权重、Le Chat、企业产品和研究发布。"
  },
  {
    title: "xAI",
    category: "前沿模型公司",
    url: "https://x.ai/news",
    level: "美国 / 官方发布",
    aliases: ["Grok"],
    tags: ["英文", "官方", "Grok", "模型发布", "产品", "API", "X"],
    description: "xAI 官方新闻入口，适合追踪 Grok 模型、API、X 平台整合和公司公告。"
  },
  {
    title: "Cohere",
    category: "前沿模型公司",
    url: "https://cohere.com/blog",
    level: "加拿大 / 官方发布",
    aliases: ["Command", "Cohere Blog"],
    tags: ["英文", "官方", "企业AI", "检索", "多语种", "主权AI", "研究"],
    description: "Cohere 官方博客，适合追踪企业级大模型、检索增强、多语种模型和主权 AI 议题。"
  },
  {
    title: "Perplexity",
    category: "前沿模型公司",
    url: "https://www.perplexity.ai/changelog",
    level: "美国 / 官方更新",
    aliases: ["Perplexity AI"],
    tags: ["英文", "官方", "搜索AI", "答案引擎", "产品更新", "Agent", "浏览器"],
    description: "Perplexity 官方更新日志，适合追踪搜索 AI、Comet、Agent、API 和产品功能变化。",
    actions: [{ label: "Blog", url: "https://www.perplexity.ai/hub/blog" }]
  },
  {
    title: "NVIDIA AI Blog",
    category: "大型科技与云平台",
    url: "https://developer.nvidia.com/blog/",
    level: "美国 / NVIDIA",
    aliases: ["英伟达AI", "NVIDIA Developer Blog"],
    tags: ["英文", "官方", "GPU", "AI基础设施", "推理", "Agent", "机器人"],
    description: "NVIDIA 技术博客，适合追踪 AI 基础设施、推理优化、GPU 软件栈、机器人和物理 AI。"
  },
  {
    title: "Amazon Science",
    category: "大型科技与云平台",
    url: "https://www.amazon.science/news-and-features/",
    level: "美国 / Amazon",
    aliases: ["AWS AI", "Amazon AI"],
    tags: ["英文", "官方", "Amazon", "AWS", "机器学习", "云平台", "研究"],
    description: "Amazon Science 官方新闻与研究入口，适合追踪 Amazon/AWS 在机器学习、自动推理和云基础设施上的发布。"
  },
  {
    title: "IBM Research AI",
    category: "大型科技与云平台",
    url: "https://research.ibm.com/blog?tag=artificial-intelligence",
    level: "美国 / IBM",
    aliases: ["IBM Research"],
    tags: ["英文", "官方", "企业AI", "开源", "Granite", "研究", "混合云"],
    description: "IBM Research AI 博客，适合追踪企业 AI、Granite、开源、混合云和 AI 研究发布。"
  },
  {
    title: "DeepSeek",
    category: "中国大模型",
    url: "https://deepseek.com/en/news/",
    level: "中国 / 官方发布",
    aliases: ["深度求索"],
    tags: ["英文", "官方", "中文", "开源", "推理", "代码", "API"],
    description: "DeepSeek 官方 Research & News，适合追踪模型发布、技术报告、开源进展和研究索引。",
    actions: [{ label: "API更新", url: "https://api-docs.deepseek.com/updates/" }]
  },
  {
    title: "Qwen",
    category: "中国大模型",
    url: "https://qwen.ai/research",
    level: "中国 / 官方研究",
    aliases: ["通义千问", "QwenLM"],
    tags: ["英文", "中文", "官方", "开源", "阿里", "模型发布", "多模态"],
    description: "Qwen 官方研究与发布入口，适合追踪通义千问模型、开源权重、多模态和技术报告。",
    actions: [{ label: "GitHub", url: "https://github.com/QwenLM" }]
  },
  {
    title: "Moonshot AI / Kimi",
    category: "中国大模型",
    url: "https://www.moonshot.cn/",
    level: "中国 / 官方发布",
    aliases: ["月之暗面", "Kimi"],
    tags: ["中文", "官方", "Kimi", "长上下文", "Agent", "模型发布", "API"],
    description: "Moonshot AI 官方入口，适合追踪 Kimi 模型、长上下文、Agent 产品和研究发布。",
    actions: [{ label: "Kimi Blog", url: "https://platform.kimi.com/blog" }]
  },
  {
    title: "Zhipu AI",
    category: "中国大模型",
    url: "https://www.zhipuai.cn/zh/research",
    level: "中国 / 官方研究",
    aliases: ["智谱AI", "智谱清言", "GLM"],
    tags: ["中文", "官方", "GLM", "开源", "Agent", "代码", "多模态"],
    description: "智谱官方研究入口，适合追踪 GLM 系列模型、开源发布、Agent、代码和多模态能力。",
    actions: [{ label: "开放平台", url: "https://open.bigmodel.cn/" }]
  },
  {
    title: "Tencent Hunyuan",
    category: "中国大模型",
    url: "https://hunyuan.tencent.com/",
    level: "中国 / 官方产品",
    aliases: ["腾讯混元", "Hunyuan"],
    tags: ["中文", "官方", "腾讯", "开源", "Agent", "代码", "多模态"],
    description: "腾讯混元官方入口，适合追踪混元模型、腾讯元宝、CodeBuddy、开源模型和腾讯云接入。",
    actions: [
      { label: "腾讯新闻", url: "https://www.tencent.com/zh-cn/newsroom/all-news/" },
      { label: "Hy4公告", url: "https://www.tencent.com/zh-cn/tencent-releases-and-open-sources-tencent-hy4-preview/" }
    ]
  },
  {
    title: "Baidu Qianfan",
    category: "中国大模型",
    url: "https://cloud.baidu.com/news/notice",
    level: "中国 / 百度智能云",
    aliases: ["百度千帆", "文心", "ERNIE"],
    tags: ["中文", "官方", "百度", "云平台", "文心", "Agent", "产品公告"],
    description: "百度智能云新闻与公告入口，适合追踪千帆平台、文心模型、产品升级和服务调整。",
    actions: [{ label: "千帆文档", url: "https://aca.bce.baidu.com/doc/qianfan/index.html" }]
  },
  {
    title: "Hugging Face",
    category: "开源社区与论文",
    url: "https://huggingface.co/blog",
    level: "开源社区",
    aliases: ["HF", "抱抱脸"],
    tags: ["英文", "开源", "模型", "数据集", "Spaces", "社区", "工程"],
    description: "Hugging Face 官方博客与社区文章入口，适合追踪开源模型、数据集、工具库、Spaces 和工程实践。",
    actions: [
      { label: "Models", url: "https://huggingface.co/models" },
      { label: "Datasets", url: "https://huggingface.co/datasets" }
    ]
  },
  {
    title: "arXiv",
    category: "开源社区与论文",
    url: "https://arxiv.org/list/cs.AI/recent",
    level: "预印本",
    aliases: ["arxiv", "AI预印本"],
    tags: ["英文", "论文", "预印本", "AI", "机器学习", "NLP", "计算机视觉"],
    description: "arXiv AI 最新预印本入口，适合快速追踪尚未正式发表的 AI 研究论文。",
    actions: [
      { label: "cs.CL", url: "https://arxiv.org/list/cs.CL/recent" },
      { label: "cs.LG", url: "https://arxiv.org/list/cs.LG/recent" }
    ]
  },
  {
    title: "Papers with Code",
    category: "开源社区与论文",
    url: "https://paperswithcode.com/",
    level: "论文与代码",
    aliases: ["PwC"],
    tags: ["英文", "论文", "代码", "数据集", "Benchmark", "开源", "排行榜"],
    description: "论文、代码、数据集与任务排行榜入口，适合把 AI 论文和可复现实验资源连起来查。"
  },
  {
    title: "Arena",
    category: "评测、安全与治理",
    url: "https://arena.ai/blog",
    level: "模型评测",
    aliases: ["LMArena", "Chatbot Arena"],
    tags: ["英文", "评测", "排行榜", "模型比较", "社区投票", "Benchmark"],
    description: "Arena 官方博客，适合追踪模型真实使用评测、排行榜方法、Agent 与多模态模型比较。",
    actions: [{ label: "Leaderboard", url: "https://arena.ai/" }]
  },
  {
    title: "METR",
    category: "评测、安全与治理",
    url: "https://metr.org/blog/",
    level: "独立评测",
    aliases: ["Model Evaluation and Threat Research"],
    tags: ["英文", "安全", "评测", "前沿模型", "Agent", "风险", "治理"],
    description: "METR 官方更新入口，适合追踪前沿模型能力评估、独立测试、Agent 风险和安全研究。"
  },
  {
    title: "UK AI Security Institute",
    category: "评测、安全与治理",
    url: "https://www.aisi.gov.uk/blog",
    level: "英国 / 政府机构",
    aliases: ["AISI", "英国AI安全研究所"],
    tags: ["英文", "安全", "治理", "评测", "政府", "红队", "风险"],
    description: "英国 AI Security Institute 官方博客，适合追踪前沿模型评测、AI 安全工具、事件报告和政策合作。",
    actions: [{ label: "GOV.UK新闻", url: "https://www.gov.uk/search/news-and-communications?organisations%5B%5D=ai-security-institute&parent=ai-security-institute" }]
  },
  {
    title: "Stanford HAI",
    category: "评测、安全与治理",
    url: "https://hai.stanford.edu/news",
    level: "高校研究机构",
    aliases: ["斯坦福HAI", "AI Index"],
    tags: ["英文", "研究", "治理", "AI指数", "政策", "社会影响", "高校"],
    description: "Stanford HAI 新闻入口，适合追踪 AI 指数、治理、社会影响、人本 AI 和跨学科研究。",
    actions: [{ label: "AI Index", url: "https://aiindex.stanford.edu/" }]
  },
  {
    title: "Epoch AI",
    category: "评测、安全与治理",
    url: "https://epoch.ai/",
    level: "独立研究",
    aliases: ["Epoch"],
    tags: ["英文", "AI趋势", "算力", "预测", "能力评估", "数据", "治理"],
    description: "Epoch AI 独立研究入口，适合追踪 AI 发展趋势、算力、模型能力、经济影响和长期预测。"
  }
];


  return { journals, dataSources, thinkTanks, newsSources, governmentSites, aiSources, CNKI_ADVANCED_SEARCH };
});
