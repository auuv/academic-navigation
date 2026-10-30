(function (root, factory) {
  const catalog = factory();
  if (typeof module === "object" && module.exports) module.exports = catalog;
  else root.GasProjectCatalog = catalog;
})(typeof globalThis === "object" ? globalThis : this, function () {
  const sources = [];
  const categories = [];
  // Access labels describe the linked offering, not a promise that every document is free.
  function group(category, rows) {
    categories.push(category);
    for (const [title, url, region, access, description, keywords, priority = 0] of rows) {
      sources.push({ title, url, category, region, access, description,
        tags: keywords.split(" / "), level: `${region} · ${access}`, priority });
    }
  }

  group("政府与监管", [
    ["国家能源局 NEA", "https://www.nea.gov.cn/", "中国", "公开为主", "天然气发展政策、产供储销体系、管网公平开放及能源安全政策原文。", "政策 / 保供 / 管网"],
    ["国家发展改革委 NDRC", "https://www.ndrc.gov.cn/", "中国", "公开为主", "天然气管道运输价格、能源项目核准及价格机制文件。", "管输费 / 定价 / 项目核准"],
    ["海关总署", "https://www.customs.gov.cn/", "中国", "公开为主", "天然气进口统计与海关公告；研究时区分气态天然气和液化天然气口径。", "进口 / LNG / 管道气 / 海关"],
    ["国家统计局", "https://www.stats.gov.cn/", "中国", "公开为主", "国内天然气产量、能源生产及统计年鉴，与进口数据配合分析供需。", "产量 / 消费 / 统计年鉴"],
    ["FERC 美国联邦能源监管委员会", "https://www.ferc.gov/natural-gas", "北美", "公开为主", "美国州际天然气管道、LNG 设施审批、环境评估和项目档案。", "美国 / 许可 / 管道 / LNG", 90],
    ["DOE 美国能源部 LNG", "https://www.energy.gov/hgeo/liquefied-natural-gas-lng", "北美", "公开为主", "美国 LNG 出口政策、授权及天然气进出口信息入口。", "美国 / 出口许可 / LNG"],
    ["PHMSA 美国管道安全监管", "https://www.phmsa.dot.gov/", "北美", "公开为主", "管道与危险品运输安全、LNG 设施安全资料及事故统计。", "管道安全 / 泄漏 / 事故"],
    ["CER 加拿大能源监管机构", "https://www.cer-rec.gc.ca/en/", "北美", "公开为主", "加拿大跨省与国际管道监管、天然气贸易统计和能源市场分析。", "加拿大 / 管道 / 进出口"],
    ["ACER 欧盟能源监管合作署", "https://www.acer.europa.eu/", "欧洲", "公开为主", "欧洲天然气市场监测、LNG 价格评估、市场透明度和跨境监管报告。", "欧盟 / LNG / 价格 / REMIT", 80],
    ["欧盟委员会能源总司", "https://energy.ec.europa.eu/", "欧洲", "公开为主", "欧洲天然气供应安全、基础设施、储气和能源市场政策。", "欧盟 / 储气 / 能源安全"],
    ["Ofgem 英国能源监管局", "https://www.ofgem.gov.uk/", "欧洲", "公开为主", "英国天然气输配网络监管、收费与市场规则。", "英国 / 管输 / 监管"],
    ["Bundesnetzagentur 德国联邦网络局", "https://www.bundesnetzagentur.de/EN/Home/home_node.html", "欧洲", "公开为主", "德国天然气供应形势、网络监管和能源市场信息。", "德国 / 供应安全 / 管网"],
    ["日本经济产业省资源能源厅", "https://www.enecho.meti.go.jp/en/", "亚太", "公开为主", "日本 LNG 采购、能源安全、天然气政策与能源白皮书。", "日本 / LNG / 能源政策"],
    ["JOGMEC 天然气与 LNG 信息", "https://journal.jogmec.go.jp/oilgas/nglng/index.html", "亚太", "公开为主", "日本机构整理的天然气和 LNG 价格动态、项目及市场资料，以日文为主。", "日本 / JKM / LNG / 市场周报", 85],
    ["ACCC 澳大利亚竞争与消费者委员会", "https://www.accc.gov.au/by-industry/energy", "亚太", "公开为主", "澳大利亚天然气市场调查，关注东海岸供需、价格和出口关联。", "澳大利亚 / 供需 / 价格"],
    ["PPAC 印度石油规划与分析局", "https://ppac.gov.in/", "亚太", "公开为主", "印度天然气产量、消费和 LNG 进口等官方行业统计。", "印度 / LNG进口 / 统计"],
    ["EMA 新加坡能源市场管理局", "https://www.ema.gov.sg/", "亚太", "公开为主", "新加坡天然气进口、LNG 市场与电力燃料供应政策。", "新加坡 / LNG / 进口"],
    ["PNGRB 印度石油天然气监管委员会", "https://www.pngrb.gov.in/eng-web/statistics.html", "亚太", "公开为主", "印度天然气管网授权、运输费率和城市燃气监管文件。", "印度 / 管网 / 费率"]
  ]);

  group("国际组织与行业协会", [
    ["IEA 国际能源署 · 天然气", "https://www.iea.org/energy-system/fossil-fuels/natural-gas", "全球", "部分订阅", "全球天然气供需和 Gas Market Report；报告与数据库的访问条件各有不同。", "天然气 / 供需 / 预测", 100],
    ["IGU 国际天然气联盟", "https://www.igu.org/igu-reports", "全球", "公开为主", "World LNG Report、全球天然气报告和批发气价调查。", "LNG年报 / 贸易 / 船队 / 行业协会", 99],
    ["GIIGNL 国际液化天然气进口商组织", "https://www.giignl.org/", "全球", "公开为主", "LNG 年度贸易、液化与再气化设施、船队及合同结构资料。", "LNG / 年报 / 接收站 / 贸易", 98],
    ["GECF 天然气出口国论坛", "https://www.gecf.org/", "全球", "公开为主", "天然气出口国视角的统计、公报与长期供需展望。", "出口国 / 统计 / 展望"],
    ["IEF 国际能源论坛", "https://www.ief.org/", "全球", "公开为主", "能源生产国与消费国对话、市场安全报告和 JODI 数据合作。", "能源安全 / 国际合作 / LNG"],
    ["GIE 欧洲天然气基础设施协会", "https://www.gie.eu/transparency/", "欧洲", "公开为主", "欧洲储气、LNG 透明度平台以及管网、接收站地图的汇总入口。", "基础设施 / 储气 / 接收站"],
    ["ASEAN Centre for Energy 东盟能源中心", "https://aseanenergy.org/", "亚太", "公开为主", "东盟能源展望、跨东盟天然气管道与区域 LNG 合作资料。", "东盟 / TAGP / 东南亚 / 管道"]
  ]);

  group("流量、贸易与项目数据库", [
    ["EIA 美国天然气数据", "https://www.eia.gov/naturalgas/", "北美", "公开为主", "产量、消费、库存、价格与进出口，适合建立美国天然气供需时间序列。", "美国 / Henry Hub / 库存 / LNG", 100],
    ["ENTSOG 管网透明度平台", "https://transparency.entsog.eu/", "欧洲", "公开为主", "欧洲输气节点的流量、容量和相关运营数据，适合跨境管道研究。", "管道流量 / 跨境 / 容量", 99],
    ["ENTSOG 欧洲天然气流向看板", "https://gasdashboard.entsog.eu/", "欧洲", "公开为主", "按供应通道展示欧洲气流与储气；聚合口径适合观察供应结构。", "流向 / 管道 / LNG / 储气", 98],
    ["GIE AGSI 储气数据库", "https://agsi.gie.eu/", "欧洲", "公开为主", "欧洲储气库存、注采与充满率；API 访问需注册。", "储气 / 库存 / 注采 / API", 97],
    ["GIE ALSI LNG 透明度平台", "https://alsi.gie.eu/", "欧洲", "公开为主", "欧洲 LNG 接收站库存与外输等运营数据；API 访问需注册。", "接收站 / LNG / 库存 / 外输", 96],
    ["GEM 全球天然气基础设施追踪", "https://globalenergymonitor.org/projects/global-gas-infrastructure-tracker/", "全球", "公开为主", "全球天然气输送管道、LNG 进出口终端与运输船项目，含地图、状态和来源。", "管道地图 / LNG船 / 接收站 / 项目数据库", 95],
    ["JODI-Gas 天然气数据库", "https://www.jodidata.org/gas/", "全球", "公开为主", "各经济体天然气月度生产、消费、贸易和库存，需留意缺失值与口径。", "月度 / 产量 / 进出口 / 库存", 94],
    ["UN Comtrade 联合国贸易数据库", "https://comtradeplus.un.org/", "全球", "部分订阅", "按贸易伙伴查天然气贸易；HS 271111 为液化天然气，271121 为气态天然气。", "双边贸易 / HS271111 / HS271121 / 海关", 90],
    ["Eurostat 欧盟统计局能源", "https://ec.europa.eu/eurostat/web/energy", "欧洲", "公开为主", "欧洲能源平衡、天然气供应与进口统计，可用于国别比较。", "能源平衡 / 进口 / 欧盟"],
    ["Energy Institute 世界能源统计", "https://www.energyinst.org/statistical-review", "全球", "公开为主", "跨国天然气产消储量和能源结构的长期年度统计。", "年度数据 / 储量 / 产量 / 消费"],
    ["AEMO 澳大利亚能源市场运营商", "https://aemo.com.au/", "亚太", "公开为主", "澳大利亚天然气市场、Gas Bulletin Board 与供需展望入口。", "澳大利亚 / 管网 / 流量 / GSOO"],
    ["ENTSOG 管网容量地图", "https://www.entsog.eu/maps", "欧洲", "公开为主", "欧洲管线、互联点、储气与 LNG 设施容量地图及历史版本。", "管道地图 / 互联点 / 基础设施"]
  ]);

  group("智库与学术研究", [
    ["OIES 牛津能源研究所", "https://www.oxfordenergy.org/", "全球", "公开为主", "天然气与 LNG 市场、定价、合同、俄罗斯及欧洲能源关系研究。", "天然气 / LNG / 定价 / 地缘政治", 95],
    ["Columbia CGEP 哥伦比亚全球能源政策中心", "https://www.energypolicy.columbia.edu/", "全球", "公开为主", "LNG 出口、全球气市、能源安全与政策研究。", "美国 / LNG / 政策 / 能源安全", 90],
    ["IEEFA 能源经济与金融分析研究所", "https://ieefa.org/topic/lng", "全球", "公开为主", "LNG 项目经济性、需求风险和能源转型研究，带有明确的转型研究视角。", "LNG / 项目风险 / 融资 / 转型", 85],
    ["CSIS 战略与国际问题研究中心", "https://www.csis.org/", "全球", "公开为主", "能源安全、天然气贸易、制裁及国际政治分析。", "地缘政治 / 能源安全 / 制裁"],
    ["Bruegel 布鲁盖尔研究所", "https://www.bruegel.org/", "欧洲", "公开为主", "欧洲天然气供应、价格冲击及能源政策研究，含数据型专题。", "欧洲 / 进口 / 能源政策"],
    ["KAPSARC 阿卜杜拉国王石油研究中心", "https://www.kapsarc.org/", "中东", "公开为主", "天然气、LNG 和能源经济建模，适合研究中东与全球市场。", "中东 / 天然气 / 能源经济"],
    ["IEEJ 日本能源经济研究所", "https://eneken.ieej.or.jp/en/", "亚太", "部分订阅", "日本与亚洲 LNG 需求、能源安全及长期能源展望。", "日本 / 亚洲 / LNG需求"],
    ["ERIA 东盟与东亚经济研究院", "https://www.eria.org/", "亚太", "公开为主", "东南亚天然气基础设施、LNG 市场和区域能源互联研究。", "东盟 / 东南亚 / 管道 / LNG"],
    ["Rice Baker Institute 莱斯大学贝克研究所", "https://www.bakerinstitute.org/", "全球", "公开为主", "天然气贸易、美国 LNG、能源市场与地缘政治研究。", "美国 / LNG / 能源研究"],
    ["Rystad Energy 睿咨得能源", "https://www.rystadenergy.com/", "全球", "部分订阅", "商业能源研究与资产数据库，覆盖 LNG 项目、产能和供需预测。", "商业研究 / 产能 / 项目 / LNG"],
    ["Wood Mackenzie 伍德麦肯兹", "https://www.woodmac.com/", "全球", "部分订阅", "天然气与 LNG 商业研究、资产分析及市场预测，完整产品通常需订阅。", "商业研究 / LNG / 资产 / 成本"]
  ]);

  group("新闻与专业媒体", [
    ["Reuters 路透社 · 能源", "https://www.reuters.com/business/energy/", "全球", "部分订阅", "天然气、LNG、制裁、项目投资与航运突发事件的新闻报道。", "新闻 / 地缘政治 / LNG", 80],
    ["LNG Prime", "https://lngprime.com/", "全球", "部分订阅", "专注 LNG 合同、液化工厂、接收站、船舶订单和项目进展。", "LNG / 合同 / 船舶 / 接收站", 85],
    ["LNG Industry", "https://www.lngindustry.com/", "全球", "部分订阅", "LNG 液化、运输、再气化及工程技术新闻与专题。", "LNG / 工程 / 船运"],
    ["Natural Gas Intelligence 天然气情报", "https://www.naturalgasintel.com/", "北美", "部分订阅", "北美天然气价格、管道运行、产量及 LNG 出口新闻。", "美国 / 管道 / 现货 / LNG"],
    ["Riviera Maritime Media", "https://www.rivieramm.com/", "全球", "部分订阅", "LNG 运输船、海事技术、船队与海上作业报道。", "LNG船 / 船队 / 海事技术"],
    ["Offshore Energy", "https://www.offshore-energy.biz/", "全球", "部分订阅", "LNG、浮式设施、海底管道、船舶与海上能源项目新闻。", "FLNG / FSRU / 海底管道"],
    ["Pipeline & Gas Journal", "https://pgjonline.com/", "全球", "部分订阅", "天然气管道建设、完整性管理、压缩机和中游工程报道。", "管道 / 中游 / 工程 / 完整性"],
    ["World Pipelines", "https://www.worldpipelines.com/", "全球", "部分订阅", "输送管道工程、检测、维护及管网项目动态。", "管道 / 检测 / 建设施工"],
    ["Energy Intelligence · World Gas Intelligence", "https://www.energyintel.com/world-gas-intelligence-market", "全球", "订阅为主", "全球天然气、LNG 合同、贸易与价格的专业市场报道。", "LNG / 合同 / 贸易 / 行情"],
    ["中国能源报", "https://www.cnenergynews.cn/", "中国", "公开为主", "中国天然气产业、管网改革、LNG 接收站和保供新闻。", "中国 / 管网 / 接收站 / 保供"],
    ["TradeWinds 贸易风", "https://www.tradewindsnews.com/", "全球", "订阅为主", "LNG 船东、租船交易、造船订单与航运公司动态。", "LNG船 / 租船 / 船东"],
    ["The Maritime Executive", "https://maritime-executive.com/", "全球", "公开为主", "国际航运、LNG 船舶、港口及海事安全事件报道。", "航运 / LNG船 / 港口"]
  ]);

  group("价格、运价与船舶追踪", [
    ["上海石油天然气交易中心 SHPGX", "https://www.shpgx.com/html/", "中国", "部分订阅", "中国 LNG 进口到岸价格、国内 LNG 报价、管道气交易和接收站窗口信息。", "中国 / LNG价格 / 管道气 / 交易", 95],
    ["Spark Commodities", "https://www.sparkcommodities.com/", "全球", "订阅为主", "LNG 运费评估、到岸价格与欧洲气价，含定价方法说明。", "LNG运价 / Spark30S / Spark25S / DES", 90],
    ["Baltic Exchange 波罗的海交易所", "https://www.balticexchange.com/", "全球", "部分订阅", "航运市场基准、LNG 航线运价与指数方法文件。", "LNG运价 / BLNG / 航线"],
    ["Kpler", "https://www.kpler.com/", "全球", "订阅为主", "LNG 船货流向、装卸港、船舶与商品贸易分析平台。", "LNG船货 / 船舶追踪 / 贸易流"],
    ["Vortexa", "https://www.vortexa.com/", "全球", "订阅为主", "能源船货流动、LNG 运输与航运市场分析。", "LNG船货 / AIS / 航线"],
    ["ICIS 安迅思", "https://www.icis.com/", "全球", "部分订阅", "天然气与 LNG 价格评估、市场新闻和供需分析。", "LNG / TTF / 价格评估"],
    ["Argus 阿格斯", "https://www.argusmedia.com/", "全球", "部分订阅", "LNG、天然气与运费价格评估及方法论。", "LNG / 气价 / 运费"],
    ["S&P Global Energy / Platts 普氏", "https://www.spglobal.com/energy/en/products-solutions/lng/lng-market-data", "全球", "部分订阅", "JKM 等 LNG 价格基准、天然气市场报道及方法论；数据产品需授权。", "JKM / LNG / 价格基准"],
    ["ICE 天然气期货", "https://www.ice.com/global-natural-gas-futures", "全球", "部分订阅", "TTF 等天然气合约和 LNG 运费期货的合约规格与市场入口。", "TTF / 期货 / LNG运费"],
    ["CME Group 芝商所", "https://www.cmegroup.com/markets/energy.html", "全球", "部分订阅", "Henry Hub 天然气等能源合约规格、结算与行情入口。", "Henry Hub / 期货 / 价格"],
    ["MarineTraffic 船舶追踪", "https://www.marinetraffic.com/", "全球", "部分订阅", "船舶资料、港口与 AIS 航迹；历史与卫星 AIS 等功能通常付费。", "AIS / LNG船 / 船位 / 港口"],
    ["VesselFinder 船舶追踪", "https://www.vesselfinder.com/", "全球", "部分订阅", "查询 LNG 船名、IMO 编号与可用船位，历史数据和高级服务另计。", "AIS / IMO编号 / 船位"],
    ["Clarksons Research 克拉克森研究", "https://www.clarksons.net/", "全球", "订阅为主", "船队、船舶订单、造船与海运市场数据库，适合 LNG 运力研究。", "LNG船队 / 新船订单 / 运力"]
  ]);

  group("管网与跨境管道运营商", [
    ["国家管网集团 PipeChina", "https://www.pipechina.com.cn/", "中国", "公开为主", "中国干线管网、LNG 接收站、储气设施及公平开放信息。", "中国 / 西气东输 / 管网 / LNG", 90],
    ["Gassco 挪威天然气管网", "https://gassco.eu/", "欧洲", "公开为主", "挪威对欧洲供气的管道与处理设施运营信息。", "挪威 / 欧洲 / 海底管道"],
    ["National Gas 英国国家输气网", "https://www.nationalgas.com/", "欧洲", "公开为主", "英国高压输气系统、运营数据和网络发展资料。", "英国 / 输气 / 流量"],
    ["NaTran 法国输气网（原 GRTgaz）", "https://www.natrangroupe.com/en", "欧洲", "公开为主", "法国输气网络、运营与基础设施公告；检索旧资料时可用 GRTgaz。", "法国 / GRTgaz / 管网"],
    ["Snam 意大利天然气基础设施", "https://www.snam.it/", "欧洲", "公开为主", "意大利输气、储气与 LNG 再气化设施及公司披露。", "意大利 / 管网 / 储气"],
    ["Enagás 西班牙输气系统", "https://www.enagas.es/en/", "欧洲", "公开为主", "西班牙天然气管网、LNG 接收站和系统运营信息。", "西班牙 / LNG接收站 / 管网"],
    ["Fluxys 比利时天然气基础设施", "https://www.fluxys.com/", "欧洲", "公开为主", "比利时及欧洲输气、储气与 LNG 设施的服务和运营信息。", "比利时 / 泽布吕赫 / LNG"],
    ["Gasunie 荷兰天然气基础设施", "https://www.gasunie.nl/en", "欧洲", "公开为主", "荷兰及德国管网、LNG 和能源基础设施项目资料。", "荷兰 / 德国 / 管网"],
    ["TAP 跨亚得里亚海天然气管道", "https://www.tap-ag.com/", "欧洲", "公开为主", "南部天然气走廊欧洲段的线路、容量、运营与扩容信息。", "阿塞拜疆 / 南部走廊 / 跨境管道"],
    ["TANAP 跨安纳托利亚天然气管道", "https://www.tanap.com/", "欧洲", "公开为主", "阿塞拜疆经土耳其向欧洲输气的跨境管道项目资料。", "土耳其 / 阿塞拜疆 / 管道"],
    ["BOTAŞ 土耳其管道公司", "https://www.botas.gov.tr/", "欧洲", "公开为主", "土耳其天然气输送、LNG 接收与储气业务信息。", "土耳其 / LNG / 管道"],
    ["TC Energy 加拿大管网运营商", "https://www.tcenergy.com/", "北美", "公开为主", "加拿大、美国及墨西哥天然气管网、项目和投资者披露。", "加拿大 / 美国 / 墨西哥 / 管道"],
    ["Kinder Morgan 金德摩根", "https://www.kindermorgan.com/Operations/Natural-Gas/Index", "北美", "公开为主", "美国天然气管线、储气与 LNG 相关中游资产信息。", "美国 / 管道 / 储气"],
    ["Enbridge 恩桥", "https://www.enbridge.com/", "北美", "公开为主", "北美天然气输送与中游资产、管线项目和公司公告。", "加拿大 / 美国 / 管道"],
    ["GAIL 印度天然气公司", "https://gailonline.com/", "亚太", "公开为主", "印度天然气输送管网、LNG 业务与项目披露。", "印度 / 管网 / LNG"]
  ]);

  group("LNG 供应商与接收站", [
    ["中国海油 CNOOC", "https://www.cnooc.com.cn/", "中国", "公开为主", "中国海油天然气供应、LNG 进口与接收站项目公告。", "中国 / LNG / 接收站"],
    ["中国石油 CNPC", "https://www.cnpc.com.cn/", "中国", "公开为主", "天然气生产、跨境管道气合作、LNG 与海外项目资料。", "中国 / 中亚 / 俄罗斯 / 天然气"],
    ["中国石化 Sinopec", "http://www.sinopecgroup.com/group/", "中国", "公开为主", "中国石化天然气业务、LNG 合同与接收站项目动态。", "中国 / LNG / 接收站"],
    ["QatarEnergy LNG 卡塔尔能源 LNG", "https://www.qatarenergylng.qa/", "中东", "公开为主", "卡塔尔 LNG 液化设施、出口业务和项目一手公告。", "卡塔尔 / LNG出口 / 北方气田"],
    ["Cheniere Energy 切尼尔能源", "https://www.cheniere.com/", "北美", "公开为主", "美国 Sabine Pass、Corpus Christi 液化项目及 LNG 销售合同披露。", "美国 / LNG出口 / 长协"],
    ["Venture Global", "https://venturegloballng.com/", "北美", "公开为主", "美国 LNG 液化与出口项目、建设进展及商业公告。", "美国 / Plaquemines / Calcasieu Pass"],
    ["LNG Canada 加拿大液化天然气", "https://www.lngcanada.ca/", "北美", "公开为主", "加拿大 Kitimat LNG 出口项目及建设、运营与社区信息。", "加拿大 / Kitimat / LNG出口"],
    ["Woodside Energy 伍德赛德能源", "https://www.woodside.com/", "亚太", "公开为主", "澳大利亚及国际 LNG 项目、产销和投资者报告。", "澳大利亚 / LNG出口 / 项目"],
    ["PETRONAS 马来西亚国家石油公司", "https://www.petronas.com/", "亚太", "公开为主", "马来西亚 LNG、浮式液化和国际天然气业务公告。", "马来西亚 / FLNG / LNG"],
    ["Singapore LNG 新加坡 LNG", "https://www.slng.com.sg/", "亚太", "公开为主", "新加坡 LNG 接收站、储存、转运及终端服务资料。", "新加坡 / 接收站 / 转运"],
    ["Petronet LNG 印度接收站运营商", "https://www.petronetlng.in/", "亚太", "公开为主", "印度 Dahej、Kochi LNG 接收站及进口业务信息。", "印度 / 接收站 / LNG进口"],
    ["Gazprom 俄罗斯天然气工业", "https://www.gazprom.com/", "俄罗斯与中亚", "公开为主", "俄罗斯管道气、出口线路和公司项目公告，属企业披露口径。", "俄罗斯 / 西伯利亚力量 / 管道气"],
    ["NOVATEK 诺瓦泰克", "https://www.novatek.ru/en/", "俄罗斯与中亚", "公开为主", "俄罗斯 LNG 项目、产销及投资者资料，适合跟踪北极 LNG。", "俄罗斯 / 北极 / Yamal LNG"],
    ["Nigeria LNG 尼日利亚 LNG", "https://www.nlng.com/", "非洲", "公开为主", "尼日利亚 Bonny 岛 LNG 液化设施、扩建和出口公告。", "尼日利亚 / LNG出口 / Train 7"],
    ["Sonatrach 阿尔及利亚国家油气公司", "https://sonatrach.com/", "非洲", "公开为主", "阿尔及利亚天然气、LNG 与管道出口项目一手信息。", "阿尔及利亚 / 管道气 / LNG"],
    ["Shell 壳牌 LNG Outlook", "https://www.shell.com/what-we-do/oil-and-natural-gas/liquefied-natural-gas-lng/lng-outlook-2026.html", "全球", "公开为主", "壳牌发布的全球 LNG 市场展望；作为供应商观点与独立研究对读。", "LNG / 展望 / 供应商观点"],
    ["GNL Quintero 智利 LNG 接收站", "https://www.gnlquintero.cl/", "拉美", "公开为主", "智利 Quintero 接收站设施、运营与公司资料，以西班牙文为主。", "智利 / 拉美 / LNG进口"]
  ]);

  group("船东、船厂与海事技术", [
    ["Nakilat 卡塔尔天然气运输公司", "https://www.nakilat.com/", "中东", "公开为主", "LNG 运输船队、船舶管理与年度报告。", "卡塔尔 / LNG船 / 船队", 80],
    ["MOL 商船三井", "https://www.mol.co.jp/en/", "亚太", "公开为主", "LNG 运输、FSRU、船队与新造船项目的一手披露。", "日本 / LNG船 / FSRU"],
    ["NYK 日本邮船", "https://www.nyk.com/english/", "亚太", "公开为主", "LNG 船舶运输、长期租约和船队项目公告。", "日本 / LNG船 / 租船"],
    ["Seapeak LNG 船东", "https://www.seapeak.com/", "全球", "公开为主", "LNG 与液化气运输船队、运营和公司信息。", "LNG船 / 船东 / 船队"],
    ["GTT 船舶围护技术", "https://gtt.fr/", "欧洲", "公开为主", "LNG 船舶薄膜围护系统、技术方案与新船订单公告。", "法国 / LNG船 / 薄膜舱 / 技术"],
    ["中国船舶集团 CSSC", "http://www.cssc.net.cn/", "中国", "公开为主", "中国 LNG 运输船建造、交付与船舶产业项目动态。", "中国 / 沪东中华 / LNG船 / 造船"],
    ["SIGTTO 液化气船舶与码头运营商协会", "https://www.sigtto.org/", "全球", "部分订阅", "液化气运输船和码头操作、安全与行业指导文件。", "LNG船 / 码头 / 安全 / 操作", 85],
    ["DNV 挪威船级社", "https://www.dnv.com/", "全球", "部分订阅", "船舶与管道技术、LNG 燃料、船级和海事脱碳研究。", "船级 / LNG燃料 / 管道安全"],
    ["ABS 美国船级社", "https://ww2.eagle.org/", "全球", "部分订阅", "LNG 船舶、浮式设施与低温运输相关船级规则及技术指南。", "船级 / LNG船 / FSRU / FLNG"],
    ["SEA-LNG 船用 LNG 行业联盟", "https://sea-lng.org/", "全球", "公开为主", "LNG 作为船舶燃料的技术与经济研究，属于行业倡议来源。", "LNG燃料 / 加注 / 甲烷逃逸"],
    ["SGMF 气体船用燃料协会", "https://www.sgmf.info/", "全球", "部分订阅", "气体船用燃料安全、LNG 加注与操作指导。", "LNG加注 / 燃料 / 安全"]
  ]);

  group("航道、安全与环境", [
    ["IMO 国际海事组织", "https://www.imo.org/", "全球", "部分订阅", "液化气船与气体燃料船安全、海上运输和船舶排放规则入口。", "IGC Code / IGF Code / MARPOL / 海事"],
    ["UNCTAD 联合国贸发会议", "https://unctad.org/", "全球", "公开为主", "海运报告、港口、航运连通性与海上贸易研究。", "海运 / 港口 / 贸易"],
    ["IMF PortWatch 港口与航道监测", "https://portwatch.imf.org/", "全球", "公开为主", "港口和海上咽喉通道贸易监测；适合航道冲击背景分析，非 LNG 专用数据。", "港口 / 咽喉通道 / 霍尔木兹 / AIS"],
    ["Panama Canal Authority 巴拿马运河管理局", "https://pancanal.com/en/", "拉美", "公开为主", "运河通行、限制、收费和公告，关注 LNG 船跨洋航线。", "巴拿马运河 / LNG航线 / 通行"],
    ["Suez Canal Authority 苏伊士运河管理局", "https://www.suezcanal.gov.eg/", "中东", "公开为主", "苏伊士运河通航与收费公告，研究 LNG 航线与绕航成本。", "苏伊士 / 红海 / 运费"],
    ["UKMTO 英国海上贸易行动办公室", "https://www.ukmto.org/", "中东", "公开为主", "红海、亚丁湾与相关海域的海上安全通告和事件信息。", "红海 / 航运安全 / 霍尔木兹"],
    ["UNEP 国际甲烷排放观测站 IMEO", "https://www.unep.org/en/what-we-do/energy/methane/international-methane-emissions-observatory", "全球", "公开为主", "甲烷排放测量、监测与行业透明度，支持天然气供应链排放研究。", "甲烷 / 排放 / 供应链 / 环境"]
  ]);

  return { sources, categories, reviewedAt: "2026-10-26" };
});
