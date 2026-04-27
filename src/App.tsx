import { useState } from 'react'
import { Search, Filter, Sparkles, ExternalLink, Star, ChevronDown, ChevronUp, Zap, Bot, Brain, Cpu, MessageSquare, Workflow, Shield, Database, Globe, Terminal } from 'lucide-react'

interface Tool {
  id: string
  name: string
  description: string
  category: string
  features: string[]
  pricing: string
  url: string
  icon: string
  rating: number
  featured?: boolean
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'OpenAI GPTs',
    description: 'OpenAI瀹樻柟Agent鏋勫缓骞冲彴锛屾敮鎸佽嚜瀹氫箟GPT鍔╂墜锛屽彲杩炴帴API銆佷笂浼犵煡璇嗗簱銆佸畾涔夊伐鍏疯皟鐢紝涓€閿垎浜垨鍙戝竷鍒癎PT Store銆?,
    category: 'agent-platform',
    features: ['鑷畾涔夋寚浠?, '鐭ヨ瘑搴撲笂浼?, 'API宸ュ叿璋冪敤', 'GPT Store鍙戝竷'],
    pricing: 'Plus璁㈤槄',
    url: 'https://chat.openai.com/gpts',
    icon: '馃',
    rating: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Claude Projects',
    description: 'Anthropic Claude鐨勯」鐩姛鑳斤紝鏀寔涓婁笅鏂囨寔涔呭寲銆佹枃妗ｄ笂浼犮€佽嚜瀹氫箟鎸囦护锛岄€傚悎闀挎湡鍗忎綔鐨凙I鍔╂墜鍦烘櫙銆?,
    category: 'agent-platform',
    features: ['椤圭洰涓婁笅鏂?, '鏂囨。涓婁紶', '鑷畾涔夋寚浠?, '闀挎湡璁板繂'],
    pricing: 'Pro璁㈤槄',
    url: 'https://claude.ai',
    icon: '馃',
    rating: 5,
    featured: true
  },
  {
    id: '3',
    name: 'AutoGPT',
    description: '寮€婧愯嚜涓籄I Agent妗嗘灦锛岃GPT-4鑷富鍒嗚В鐩爣銆佹墽琛屼换鍔￠摼銆佷繚瀛樿蹇嗭紝瀹炵幇瀹屽叏鑷富鐨勪换鍔″畬鎴愩€?,
    category: 'agent-framework',
    features: ['鑷富浠诲姟鍒嗚В', '璁板繂鎸佷箙鍖?, '宸ュ叿璋冪敤閾?, '瀹屽叏寮€婧?],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://github.com/Significant-Gravitas/AutoGPT',
    icon: '鈿?,
    rating: 5,
    featured: true
  },
  {
    id: '4',
    name: 'LangChain',
    description: '鏈€娴佽鐨凩LM搴旂敤寮€鍙戞鏋讹紝鎻愪緵Agent缂栨帓銆佸伐鍏烽泦鎴愩€佽蹇嗙鐞嗐€丷AG绛夊叏濂楄В鍐虫柟妗堛€?,
    category: 'agent-framework',
    features: ['Agent缂栨帓', '宸ュ叿闆嗘垚', 'RAG鏀寔', '澶氭ā鍨嬪吋瀹?],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://python.langchain.com',
    icon: '馃敆',
    rating: 5
  },
  {
    id: '5',
    name: 'CrewAI',
    description: '澶欰gent鍗忎綔妗嗘灦锛屾敮鎸佽鑹叉壆婕斻€佷换鍔″垎閰嶃€佸崗浣滄墽琛岋紝閫傚悎澶嶆潅宸ヤ綔娴佺殑鑷姩鍖栧満鏅€?,
    category: 'agent-framework',
    features: ['澶欰gent鍗忎綔', '瑙掕壊鎵紨', '浠诲姟鍒嗛厤', '娴佺▼缂栨帓'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://www.crewai.com',
    icon: '馃懃',
    rating: 4
  },
  {
    id: '6',
    name: 'Microsoft AutoGen',
    description: '寰蒋寮€婧愮殑澶欰gent瀵硅瘽妗嗘灦锛屾敮鎸丄gent闂村璇濄€佷汉鏈哄崗浣溿€佷唬鐮佹墽琛岋紝鐮旂┒绾уAgent瑙ｅ喅鏂规銆?,
    category: 'agent-framework',
    features: ['澶欰gent瀵硅瘽', '浠ｇ爜鎵ц', '浜烘満鍗忎綔', '鐮旂┒绾?],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://microsoft.github.io/autogen',
    icon: '馃敩',
    rating: 5
  },
  {
    id: '7',
    name: 'OpenAI Assistants API',
    description: 'OpenAI瀹樻柟Agent API锛屾敮鎸佹寔涔呭寲绾跨▼銆佹枃浠舵绱€佷唬鐮佽В閲婂櫒銆佸嚱鏁拌皟鐢紝浼佷笟绾gent寮€鍙戦閫夈€?,
    category: 'agent-api',
    features: ['鎸佷箙鍖栫嚎绋?, '鏂囦欢妫€绱?, '浠ｇ爜瑙ｉ噴鍣?, '鍑芥暟璋冪敤'],
    pricing: 'API璁¤垂',
    url: 'https://platform.openai.com/docs/assistants',
    icon: '馃攲',
    rating: 5
  },
  {
    id: '8',
    name: 'Vercel AI SDK',
    description: 'Vercel瀹樻柟AI寮€鍙慡DK锛屾敮鎸佹祦寮忓搷搴斻€丄gent宸ュ叿璋冪敤銆佸妯″瀷缁熶竴鎺ュ彛锛孨ext.js闆嗘垚棣栭€夈€?,
    category: 'agent-api',
    features: ['娴佸紡鍝嶅簲', '宸ュ叿璋冪敤', '澶氭ā鍨嬬粺涓€', 'Next.js闆嗘垚'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://sdk.vercel.ai',
    icon: '鈻?,
    rating: 4
  },
  {
    id: '9',
    name: 'Dify',
    description: '寮€婧怢LM搴旂敤寮€鍙戝钩鍙帮紝鍙鍖栫紪鎺扐gent銆佸伐浣滄祦銆佺煡璇嗗簱锛屾敮鎸佹湰鍦伴儴缃诧紝浼佷笟绾т綆浠ｇ爜鏂规銆?,
    category: 'agent-platform',
    features: ['鍙鍖栫紪鎺?, '鐭ヨ瘑搴?, '宸ヤ綔娴?, '鏈湴閮ㄧ讲'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://dify.ai',
    icon: '馃帹',
    rating: 5,
    featured: true
  },
  {
    id: '10',
    name: 'Coze',
    description: '瀛楄妭璺冲姩AI Bot寮€鍙戝钩鍙帮紝闆朵唬鐮佸垱寤烘櫤鑳藉姪鎵嬶紝鏀寔鎻掍欢銆佺煡璇嗗簱銆佸伐浣滄祦锛屼竴閿彂甯冨埌璞嗗寘銆?,
    category: 'agent-platform',
    features: ['闆朵唬鐮?, '鎻掍欢鐢熸€?, '鐭ヨ瘑搴?, '涓€閿彂甯?],
    pricing: '鍏嶈垂',
    url: 'https://www.coze.com',
    icon: '馃',
    rating: 4
  },
  {
    id: '11',
    name: 'Gumloop',
    description: 'AI宸ヤ綔娴佽嚜鍔ㄥ寲骞冲彴锛屽彲瑙嗗寲鎷栨嫿鏋勫缓Agent娴佺▼锛岃繛鎺?00+搴旂敤锛屾棤浠ｇ爜鑷姩鍖栨墽琛屻€?,
    category: 'workflow',
    features: ['鍙鍖栨祦绋?, '搴旂敤杩炴帴', '鑷姩鍖栨墽琛?, '鏃犱唬鐮?],
    pricing: '鍏嶈垂+浠樿垂',
    url: 'https://gumloop.com',
    icon: '馃攧',
    rating: 4
  },
  {
    id: '12',
    name: 'n8n',
    description: '寮€婧愬伐浣滄祦鑷姩鍖栧伐鍏凤紝鏀寔AI鑺傜偣闆嗘垚锛屽彲鑷墭绠★紝杩炴帴200+搴旂敤瀹炵幇澶嶆潅鑷姩鍖栥€?,
    category: 'workflow',
    features: ['AI鑺傜偣', '鑷墭绠?, '200+闆嗘垚', '寮€婧?],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://n8n.io',
    icon: '鈿?,
    rating: 4
  },
  {
    id: '13',
    name: 'LlamaIndex',
    description: '鏁版嵁妗嗘灦for LLM锛屼笓娉ㄤ簬RAG鍜屾暟鎹繛鎺ワ紝璁〢gent杩炴帴缁撴瀯鍖?闈炵粨鏋勫寲鏁版嵁婧愩€?,
    category: 'agent-framework',
    features: ['RAG妗嗘灦', '鏁版嵁杩炴帴', '绱㈠紩浼樺寲', '澶氭簮鏀寔'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://www.llamaindex.ai',
    icon: '馃',
    rating: 5
  },
  {
    id: '14',
    name: 'MemGPT',
    description: '璁〢I鎷ユ湁鏃犻檺璁板繂鐨勬鏋讹紝鑷姩绠＄悊涓婁笅鏂囩獥鍙ｏ紝鏀寔闀挎湡璁板繂銆佽嚜缂栬緫璁板繂鐘舵€併€?,
    category: 'memory',
    features: ['鏃犻檺璁板繂', '涓婁笅鏂囩鐞?, '鑷紪杈戠姸鎬?, '闀挎湡瀛樺偍'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://memgpt.ai',
    icon: '馃捑',
    rating: 4
  },
  {
    id: '15',
    name: 'Phidata',
    description: '杞婚噺绾gent妗嗘灦锛岀畝娲丄PI鏋勫缓AI鍔╂墜锛屾敮鎸佽蹇嗐€佺煡璇嗐€佸伐鍏凤紝蹇€熷師鍨嬮閫夈€?,
    category: 'agent-framework',
    features: ['杞婚噺绾?, '璁板繂鏀寔', '鐭ヨ瘑搴?, '蹇€熷師鍨?],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://phidata.com',
    icon: '馃悕',
    rating: 4
  },
  {
    id: '16',
    name: 'AgentGPT',
    description: '娴忚鍣ㄥ唴杩愯AutoGPT锛岃緭鍏ョ洰鏍囧悗AI鑷富鍒嗚В鎵ц锛屽彲瑙嗗寲浠诲姟閾撅紝鏃犻渶鏈湴閮ㄧ讲銆?,
    category: 'agent-platform',
    features: ['娴忚鍣ㄨ繍琛?, '鑷富鎵ц', '鍙鍖?, '闆堕儴缃?],
    pricing: '鍏嶈垂',
    url: 'https://agentgpt.reworkd.ai',
    icon: '馃寪',
    rating: 3
  },
  {
    id: '17',
    name: 'GPT Researcher',
    description: '涓撻棬鐢ㄤ簬鐮旂┒鐨凙I Agent锛岃嚜鍔ㄦ悳绱€佽仛鍚堛€佹€荤粨淇℃伅锛岀敓鎴愮爺绌舵姤鍛婏紝鏀寔澶氭簮寮曠敤銆?,
    category: 'specialized',
    features: ['鑷姩鎼滅储', '淇℃伅鑱氬悎', '鐮旂┒鎶ュ憡', '寮曠敤杩借釜'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://gptr.dev',
    icon: '馃摎',
    rating: 4
  },
  {
    id: '18',
    name: 'OpenDevin',
    description: '寮€婧怉I杞欢寮€鍙慉gent锛屾ā鎷熷紑鍙戣€呭伐浣滄祦锛屾敮鎸佷唬鐮佺紪鍐欍€佺粓绔搷浣溿€佹祻瑙堝櫒浣跨敤銆?,
    category: 'specialized',
    features: ['浠ｇ爜缂栧啓', '缁堢鎿嶄綔', '娴忚鍣ㄤ娇鐢?, '寮€鍙戝伐浣滄祦'],
    pricing: '鍏嶈垂寮€婧?,
    url: 'https://github.com/OpenDevin/OpenDevin',
    icon: '馃懆鈥嶐煉?,
    rating: 4
  }
]

const categories = [
  { id: 'all', name: '鍏ㄩ儴', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'agent-platform', name: 'Agent骞冲彴', icon: <Bot className="w-4 h-4" /> },
  { id: 'agent-framework', name: '寮€鍙戞鏋?, icon: <Cpu className="w-4 h-4" /> },
  { id: 'agent-api', name: 'API/SDK', icon: <Terminal className="w-4 h-4" /> },
  { id: 'workflow', name: '宸ヤ綔娴?, icon: <Workflow className="w-4 h-4" /> },
  { id: 'memory', name: '璁板繂绯荤粺', icon: <Database className="w-4 h-4" /> },
  { id: 'specialized', name: '涓撶敤Agent', icon: <Shield className="w-4 h-4" /> }
]

const pricingOptions = [
  { id: 'all', name: '鍏ㄩ儴' },
  { id: 'free', name: '鍏嶈垂' },
  { id: 'paid', name: '浠樿垂' }
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPricing, setSelectedPricing] = useState('all')
  const [expandedTool, setExpandedTool] = useState<string | null>(null)

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesPricing = selectedPricing === 'all' || 
                          (selectedPricing === 'free' && (tool.pricing.includes('鍏嶈垂') || tool.pricing.includes('寮€婧?))) ||
                          (selectedPricing === 'paid' && !tool.pricing.includes('鍏嶈垂') && !tool.pricing.includes('寮€婧?))
    return matchesSearch && matchesCategory && matchesPricing
  })

  const featuredTools = tools.filter(t => t.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Agent Hub</h1>
              <p className="text-xs text-gray-400">AI鏅鸿兘浣撳伐鍏疯仛鍚堝鑸?/p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            鎺㈢储 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Agent</span> 鐢熸€?          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            鑱氬悎18+涓绘祦AI鏅鸿兘浣撳钩鍙般€佸紑鍙戞鏋躲€丄PI宸ュ叿锛岃鐩朅gent寮€鍙戝叏閾捐矾
          </p>
        </div>

        {/* Featured */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            缂栬緫鎺ㄨ崘
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map(tool => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors truncate">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="鎼滅储宸ュ叿..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {pricingOptions.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPricing(p.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedPricing === p.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white truncate">{tool.name}</h4>
                    {tool.featured && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                      {categories.find(c => c.id === tool.category)?.name}
                    </span>
                    <span className="text-xs text-gray-500">{tool.pricing}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{tool.description}</p>
              <button
                onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mb-2"
              >
                {expandedTool === tool.id ? (
                  <>鏀惰捣 <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>灞曞紑璇︽儏 <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
              {expandedTool === tool.id && (
                <div className="mb-3 p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">鏍稿績鐗规€э細</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((f, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/5 text-gray-300 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                璁块棶 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{tools.length}+</div>
              <div className="text-sm text-gray-400">鏀跺綍宸ュ叿</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{categories.length - 1}</div>
              <div className="text-sm text-gray-400">鍒嗙被瑕嗙洊</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{tools.filter(t => t.pricing.includes('鍏嶈垂') || t.pricing.includes('寮€婧?)).length}</div>
              <div className="text-sm text-gray-400">鍏嶈垂寮€婧?/div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2026</div>
              <div className="text-sm text-gray-400">鏈€鏂版洿鏂?/div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          AI Agent Hub 鈥?鑱氬悎AI鏅鸿兘浣撶敓鎬?| 鏁版嵁浠呬緵鍙傝€冿紝璇蜂互瀹樼綉涓哄噯
        </div>
      </footer>
    </div>
  )
}

export default App