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
    description: 'OpenAI官方Agent构建平台，支持自定义GPT助手，可连接API、上传知识库、定义工具调用，一键分享或发布到GPT Store。',
    category: 'agent-platform',
    features: ['自定义指令', '知识库上传', 'API工具调用', 'GPT Store发布'],
    pricing: 'Plus订阅',
    url: 'https://chat.openai.com/gpts',
    icon: '🤖',
    rating: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Claude Projects',
    description: 'Anthropic Claude的项目功能，支持上下文持久化、文档上传、自定义指令，适合长期协作的AI助手场景。',
    category: 'agent-platform',
    features: ['项目上下文', '文档上传', '自定义指令', '长期记忆'],
    pricing: 'Pro订阅',
    url: 'https://claude.ai',
    icon: '🧠',
    rating: 5,
    featured: true
  },
  {
    id: '3',
    name: 'AutoGPT',
    description: '开源自主AI Agent框架，让GPT-4自主分解目标、执行任务链、保存记忆，实现完全自主的任务完成。',
    category: 'agent-framework',
    features: ['自主任务分解', '记忆持久化', '工具调用链', '完全开源'],
    pricing: '免费开源',
    url: 'https://github.com/Significant-Gravitas/AutoGPT',
    icon: '⚡',
    rating: 5,
    featured: true
  },
  {
    id: '4',
    name: 'LangChain',
    description: '最流行的LLM应用开发框架，提供Agent编排、工具集成、记忆管理、RAG等全套解决方案。',
    category: 'agent-framework',
    features: ['Agent编排', '工具集成', 'RAG支持', '多模型兼容'],
    pricing: '免费开源',
    url: 'https://python.langchain.com',
    icon: '🔗',
    rating: 5
  },
  {
    id: '5',
    name: 'CrewAI',
    description: '多Agent协作框架，支持角色扮演、任务分配、协作执行，适合复杂工作流的自动化场景。',
    category: 'agent-framework',
    features: ['多Agent协作', '角色扮演', '任务分配', '流程编排'],
    pricing: '免费开源',
    url: 'https://www.crewai.com',
    icon: '👥',
    rating: 4
  },
  {
    id: '6',
    name: 'Microsoft AutoGen',
    description: '微软开源的多Agent对话框架，支持Agent间对话、人机协作、代码执行，研究级多Agent解决方案。',
    category: 'agent-framework',
    features: ['多Agent对话', '代码执行', '人机协作', '研究级'],
    pricing: '免费开源',
    url: 'https://microsoft.github.io/autogen',
    icon: '🔬',
    rating: 5
  },
  {
    id: '7',
    name: 'OpenAI Assistants API',
    description: 'OpenAI官方Agent API，支持持久化线程、文件检索、代码解释器、函数调用，企业级Agent开发首选。',
    category: 'agent-api',
    features: ['持久化线程', '文件检索', '代码解释器', '函数调用'],
    pricing: 'API计费',
    url: 'https://platform.openai.com/docs/assistants',
    icon: '🔌',
    rating: 5
  },
  {
    id: '8',
    name: 'Vercel AI SDK',
    description: 'Vercel官方AI开发SDK，支持流式响应、Agent工具调用、多模型统一接口，Next.js集成首选。',
    category: 'agent-api',
    features: ['流式响应', '工具调用', '多模型统一', 'Next.js集成'],
    pricing: '免费开源',
    url: 'https://sdk.vercel.ai',
    icon: '▲',
    rating: 4
  },
  {
    id: '9',
    name: 'Dify',
    description: '开源LLM应用开发平台，可视化编排Agent、工作流、知识库，支持本地部署，企业级低代码方案。',
    category: 'agent-platform',
    features: ['可视化编排', '知识库', '工作流', '本地部署'],
    pricing: '免费开源',
    url: 'https://dify.ai',
    icon: '🎨',
    rating: 5,
    featured: true
  },
  {
    id: '10',
    name: 'Coze',
    description: '字节跳动AI Bot开发平台，零代码创建智能助手，支持插件、知识库、工作流，一键发布到豆包。',
    category: 'agent-platform',
    features: ['零代码', '插件生态', '知识库', '一键发布'],
    pricing: '免费',
    url: 'https://www.coze.com',
    icon: '🤖',
    rating: 4
  },
  {
    id: '11',
    name: 'Gumloop',
    description: 'AI工作流自动化平台，可视化拖拽构建Agent流程，连接100+应用，无代码自动化执行。',
    category: 'workflow',
    features: ['可视化流程', '应用连接', '自动化执行', '无代码'],
    pricing: '免费+付费',
    url: 'https://gumloop.com',
    icon: '🔄',
    rating: 4
  },
  {
    id: '12',
    name: 'n8n',
    description: '开源工作流自动化工具，支持AI节点集成，可自托管，连接200+应用实现复杂自动化。',
    category: 'workflow',
    features: ['AI节点', '自托管', '200+集成', '开源'],
    pricing: '免费开源',
    url: 'https://n8n.io',
    icon: '⚡',
    rating: 4
  },
  {
    id: '13',
    name: 'LlamaIndex',
    description: '数据框架for LLM，专注于RAG和数据连接，让Agent连接结构化/非结构化数据源。',
    category: 'agent-framework',
    features: ['RAG框架', '数据连接', '索引优化', '多源支持'],
    pricing: '免费开源',
    url: 'https://www.llamaindex.ai',
    icon: '🦙',
    rating: 5
  },
  {
    id: '14',
    name: 'MemGPT',
    description: '让AI拥有无限记忆的框架，自动管理上下文窗口，支持长期记忆、自编辑记忆状态。',
    category: 'memory',
    features: ['无限记忆', '上下文管理', '自编辑状态', '长期存储'],
    pricing: '免费开源',
    url: 'https://memgpt.ai',
    icon: '💾',
    rating: 4
  },
  {
    id: '15',
    name: 'Phidata',
    description: '轻量级Agent框架，简洁API构建AI助手，支持记忆、知识、工具，快速原型首选。',
    category: 'agent-framework',
    features: ['轻量级', '记忆支持', '知识库', '快速原型'],
    pricing: '免费开源',
    url: 'https://phidata.com',
    icon: '🐍',
    rating: 4
  },
  {
    id: '16',
    name: 'AgentGPT',
    description: '浏览器内运行AutoGPT，输入目标后AI自主分解执行，可视化任务链，无需本地部署。',
    category: 'agent-platform',
    features: ['浏览器运行', '自主执行', '可视化', '零部署'],
    pricing: '免费',
    url: 'https://agentgpt.reworkd.ai',
    icon: '🌐',
    rating: 3
  },
  {
    id: '17',
    name: 'GPT Researcher',
    description: '专门用于研究的AI Agent，自动搜索、聚合、总结信息，生成研究报告，支持多源引用。',
    category: 'specialized',
    features: ['自动搜索', '信息聚合', '研究报告', '引用追踪'],
    pricing: '免费开源',
    url: 'https://gptr.dev',
    icon: '📚',
    rating: 4
  },
  {
    id: '18',
    name: 'OpenDevin',
    description: '开源AI软件开发Agent，模拟开发者工作流，支持代码编写、终端操作、浏览器使用。',
    category: 'specialized',
    features: ['代码编写', '终端操作', '浏览器使用', '开发工作流'],
    pricing: '免费开源',
    url: 'https://github.com/OpenDevin/OpenDevin',
    icon: '👨‍💻',
    rating: 4
  }
]

const categories = [
  { id: 'all', name: '全部', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'agent-platform', name: 'Agent平台', icon: <Bot className="w-4 h-4" /> },
  { id: 'agent-framework', name: '开发框架', icon: <Cpu className="w-4 h-4" /> },
  { id: 'agent-api', name: 'API/SDK', icon: <Terminal className="w-4 h-4" /> },
  { id: 'workflow', name: '工作流', icon: <Workflow className="w-4 h-4" /> },
  { id: 'memory', name: '记忆系统', icon: <Database className="w-4 h-4" /> },
  { id: 'specialized', name: '专用Agent', icon: <Shield className="w-4 h-4" /> }
]

const pricingOptions = [
  { id: 'all', name: '全部' },
  { id: 'free', name: '免费' },
  { id: 'paid', name: '付费' }
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
                          (selectedPricing === 'free' && (tool.pricing.includes('免费') || tool.pricing.includes('开源'))) ||
                          (selectedPricing === 'paid' && !tool.pricing.includes('免费') && !tool.pricing.includes('开源'))
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
              <p className="text-xs text-gray-400">AI智能体工具聚合导航</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            探索 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Agent</span> 生态
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            聚合18+主流AI智能体平台、开发框架、API工具，覆盖Agent开发全链路
          </p>
        </div>

        {/* Featured */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            编辑推荐
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
                placeholder="搜索工具..."
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
                  <>收起 <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>展开详情 <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
              {expandedTool === tool.id && (
                <div className="mb-3 p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">核心特性：</p>
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
                访问 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{tools.length}+</div>
              <div className="text-sm text-gray-400">收录工具</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{categories.length - 1}</div>
              <div className="text-sm text-gray-400">分类覆盖</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{tools.filter(t => t.pricing.includes('免费') || t.pricing.includes('开源')).length}</div>
              <div className="text-sm text-gray-400">免费开源</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2026</div>
              <div className="text-sm text-gray-400">最新更新</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          AI Agent Hub — 聚合AI智能体生态 | 数据仅供参考，请以官网为准
        </div>
      </footer>
    </div>
  )
}

export default App