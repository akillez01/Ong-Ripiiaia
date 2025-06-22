import { motion } from 'framer-motion';
import { Book, MapPin, Music, Play, ShoppingBag } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LogoSvg from '../components/LogoSvg';

const banners = [
	{
		id: 1,
		title: 'Caminho abertos sempre',
		description: 'Acesse nossa coleção atualizada de hinários com partituras e áudios.',
		image: '/image/mestre5.webp',
		link: '/acervo', // Corrigido para uma rota que existe
	},
	{
		id: 2,
		title: 'Fé para seguir',
		description: 'Acompanhe nossos encontros espirituais com transmissão em tempo real.',
		image: '/image/mestre1.webp',
		link: '/live',
	},
	{
		id: 3,
		title: 'Viva ao nosso Festival☆',
		description: 'Conheça os novos itens disponíveis em nossa loja virtual.',
		image: '/image/mestre2.png',
		link: '/loja',
	},
	// {
	// 	id: 4,
	// 	title: 'Natureza Sagrada',
	// 	description: 'Explore nossa conexão com a floresta e os ensinamentos da natureza.',
	// 	image: '/image/floresta2.jpeg',
	// 	link: '/biblioteca', // Corrigido para uma rota que existe
	// },
	{
		id: 5,
		title: 'Natureza Sagrada',
		description: 'Explore nossa conexão com a floresta e os ensinamentos da natureza.',
		image: '/image/floresta2.jpg',
		link: '/biblioteca', // Corrigido para uma rota que existe
	},
	{
		id: 6,
		title: 'Natureza Sagrada',
		description: 'Explore nossa conexão com a floresta e os ensinamentos da natureza.',
		image: '/image/floresta1.png',
		link: '/biblioteca', // Corrigido para uma rota que existe
	},
];

const features = [
	{
		icon: <Book className="h-10 w-10 text-primary-600" />,
		title: 'Acervo Completo',
		description: 'Hinários, partituras e materiais organizados e fáceis de acessar.',
		link: '/acervo',
	},
	{
		icon: <Music className="h-10 w-10 text-primary-600" />,
		title: 'Biblioteca Musical',
		description: 'Acesse nossa coleção de hinários, áudios e canções da doutrina.',
		link: '/biblioteca',
		external: false,
	},
	{
		icon: <Play className="h-10 w-10 text-primary-600" />,
		title: 'Transmissões ao Vivo',
		description: 'Acompanhe eventos e encontros em tempo real.',
		link: '/live',
	},
	{
		icon: <ShoppingBag className="h-10 w-10 text-primary-600" />,
		title: 'Loja Virtual',
		description: 'Adquira produtos relacionados à doutrina com facilidade.',
		link: '/loja',
	},
];

const HomePage = () => {
	const { t, i18n } = useTranslation();
	const [currentBanner, setCurrentBanner] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBanner((prev) => (prev + 1) % banners.length);
		}, 6000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			{/* Idioma Switcher */}
			<div className="flex justify-end gap-2 p-2">
				<button
					onClick={() => i18n.changeLanguage('pt')}
					className={i18n.language === 'pt' ? 'font-bold underline' : ''}
				>
					PT
				</button>
				<button
					onClick={() => i18n.changeLanguage('en')}
					className={i18n.language === 'en' ? 'font-bold underline' : ''}
				>
					EN
				</button>
			</div>
			{/* Hero Banner */}
			<section className="relative h-[80vh] min-h-[500px] bg-primary-900 overflow-hidden pt-20 z-0">
				{/* pt-20 adiciona espaço para o navbar fixo, z-0 garante que fique atrás do navbar */}
				{banners.map((banner, index) => (
					<div
						key={banner.id}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							index === currentBanner ? 'opacity-100' : 'opacity-0'
						}`}
						style={{ zIndex: 0 }}
					>
						<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
						<img
							src={banner.image}
							alt={banner.title}
							className="absolute inset-0 h-full w-full object-cover z-0"
							draggable={false}
						/>
						<div className="relative z-20 h-full flex items-center">
							<div className="container-custom">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
									className="max-w-2xl"
								>
									<h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
										{banner.title}
									</h1>
									<p className="text-lg md:text-xl text-white/90 mb-8">
										{banner.description}
									</p>
									<Link
										to={banner.link}
										className="btn btn-primary px-6 py-3 text-base inline-flex items-center font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
										onClick={(e) => {
											// Prevenindo comportamento padrão e navegando explicitamente
											e.preventDefault();
											window.location.href = banner.link;
										}}
									>
										Saiba mais <span className="ml-2">→</span>
									</Link>
								</motion.div>
							</div>
						</div>
					</div>
				))}

				{/* Banner Navigation */}
				<div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
					<div className="flex space-x-2">
						{banners.map((banner, index) => (
							<button
								key={banner.id}
								onClick={() => setCurrentBanner(index)}
								className={`w-3 h-3 rounded-full transition-colors ${
									index === currentBanner ? 'bg-white' : 'bg-white/40'
								}`}
								aria-label={`Ver banner ${banner.title}`}
							/>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="section bg-earth-50">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
						<div className="flex justify-center mb-4">
							<div className="relative animate-float">
								<LogoSvg className="h-48 w-48" />
							</div>
						</div>
						<h2 className="section-title mb-4">Bem-vindo ao Universo Daime</h2>
						{/* Vídeo de apresentação centralizado e maior */}
						<div className="w-full flex justify-center">
							<div className="relative w-full max-w-3xl aspect-video rounded-3xl border-4 border-primary-500 shadow-xl overflow-hidden animate-pulse-border bg-gradient-to-br from-primary-400 via-secondary-300 to-primary-700">
								<iframe
									className="w-full h-full rounded-2xl min-h-[280px] md:min-h-[400px] lg:min-h-[500px]"
									src="https://www.youtube.com/embed/rqWu7U-edYM"
									title="Apresentação Ripi Iaiá"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
								{/* Borda vibrante animada */}
								<div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-transparent animate-border-glow"></div>
							</div>
						</div>
						<p className="text-lg text-gray-700 mt-8 mb-6 max-w-2xl mx-auto">
							Acreditamos que tecnologia não é só conexão digital — é ponte entre mundos. Desenvolvemos perfis vivos, reais, 
              que celebram histórias, territórios e ritos espirituais. Escutamos, 
              documentamos e visibilizamos aquilo que por tanto tempo foi silenciado.
						</p>
						<div className="flex flex-wrap justify-center gap-4 mb-2">
							<Link to="/acervo" className="btn btn-primary">
								{t('explore')}
							</Link>
							<Link to="/sobre" className="btn btn-outline">
								{t('about_project')}
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			{/* Categorias principais - Abas */}
			<section className="section relative overflow-hidden py-16">
				{/* Imagem de fundo */}
				<div className="absolute inset-0 z-0">
					<img
						src="/image/Floresta.jpeg"
						alt="Floresta Amazônica"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-white/95 dark:bg-primary-900/90"></div>
				</div>

				<div className="container-custom relative z-10">
					<div className="text-center mb-12">
						<div className="inline-flex items-center justify-center px-6 py-2 bg-primary-100 rounded-full mb-4">
							<LogoSvg className="h-6 w-6 mr-2" />
							<span className="text-primary-800 text-sm font-medium">Universo Daime</span>
						</div>
						<h2 className="text-2xl md:text-4xl font-semibold text-primary-800">Explore Nosso Universo</h2>
						<div className="w-32 h-1 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 mx-auto my-4 rounded-full"></div>
						<p className="text-gray-600 max-w-2xl mx-auto text-lg">
							Navegue por nossas diferentes áreas de conteúdo e descubra a riqueza do Santo Daime
						</p>
					</div>

					{/* Cards com visual mais moderno */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Card 1: Biblioteca */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-primary-100"
						>
							<div className="h-44 bg-primary-50 overflow-hidden relative">
								<img 
									src="/image/mestre2.png" 
									alt="Biblioteca Digital" 
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70"></div>
								<div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
									<Book className="h-6 w-6" />
								</div>
							</div>
							
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">Biblioteca Digital</h3>
								<p className="text-gray-600 mb-4 flex-1">
									Hinários, partituras, áudios e vídeos organizados em uma só plataforma.
								</p>
								<Link
									to="/biblioteca"
									className="mt-auto inline-flex items-center justify-between w-full py-2 px-3 bg-primary-50 text-primary-700 rounded-lg group-hover:bg-primary-100 transition-all duration-300"
								>
									<span className="font-medium">Explorar conteúdos</span>
									<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</Link>
							</div>
						</motion.div>

						{/* Card 2: Colônia 5000 - Nova Adição */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-primary-100"
						>
							<div className="h-44 bg-primary-50 overflow-hidden relative">
								<img 
									src="/image/floresta2.jpg" 
									alt="Colônia 5000" 
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70"></div>
								<div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
									<MapPin className="h-6 w-6" />
								</div>
								<div className="absolute top-4 right-4">
									<span className="inline-block px-2 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg">Novo</span>
								</div>
							</div>
							
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">Colônia 5000</h3>
								<p className="text-gray-600 mb-4 flex-1">
									Explore a história e o legado do Padrinho Sebastião na Colônia 5000, berço da expansão do Santo Daime.
								</p>
								<Link
									to="/colonia5000"
									className="mt-auto inline-flex items-center justify-between w-full py-2 px-3 bg-primary-50 text-primary-700 rounded-lg group-hover:bg-primary-100 transition-all duration-300"
								>
									<span className="font-medium">Conhecer história</span>
									<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</Link>
							</div>
						</motion.div>						{/* Card: Cânticos da Floresta - Nova Adição */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							viewport={{ once: true }}
							className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-primary-100"
						>
							<div className="h-44 bg-primary-50 overflow-hidden relative">
								<img 
									src="/image/floresta1.png" 
									alt="Cânticos da Floresta" 
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70"></div>
								<div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
									<Music className="h-6 w-6" />
								</div>
								<div className="absolute top-4 right-4">
									<span className="inline-block px-2 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg">Novo</span>
								</div>
							</div>
							
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">Cânticos da Floresta</h3>
								<p className="text-gray-600 mb-4 flex-1">
									Preservando a ancestralidade através da música sagrada do Santo Daime. Um acervo audiovisual único.
								</p>
								<Link
									to="/canticos-floresta"
									className="mt-auto inline-flex items-center justify-between w-full py-2 px-3 bg-primary-50 text-primary-700 rounded-lg group-hover:bg-primary-100 transition-all duration-300"
								>
									<span className="font-medium">Explorar sons</span>
									<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</Link>
							</div>
						</motion.div>

						{/* Card 3: Landing Pages */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							viewport={{ once: true }}
							className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-primary-100"
						>
							<div className="h-44 bg-primary-50 overflow-hidden relative">
								<img 
									src="/image/comunidade1.jpg" 
									alt="Landing Pages" 
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70"></div>
								<div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
									<Play className="h-6 w-6" />
								</div>
							</div>
							
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">Comunidades</h3>
								<p className="text-gray-600 mb-4 flex-1">
									Conheça artistas, mestres e comunidades do Santo Daime através de suas páginas exclusivas.
								</p>
								<Link
									to="/live"
									className="mt-auto inline-flex items-center justify-between w-full py-2 px-3 bg-primary-50 text-primary-700 rounded-lg group-hover:bg-primary-100 transition-all duration-300"
								>
									<span className="font-medium">Conhecer perfis</span>
									<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</Link>
							</div>
						</motion.div>

						{/* Card 4: Blog */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							viewport={{ once: true }}
							className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-primary-100"
						>
							<div className="h-44 bg-primary-50 overflow-hidden relative">
								<img 
									src="/image/floresta2.jpg" 
									alt="Blog" 
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70"></div>
								<div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
									<Music className="h-6 w-6" />
								</div>
							</div>
							
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">Blog e Notícias</h3>
								<p className="text-gray-600 mb-4 flex-1">
									Artigos, reflexões e notícias sobre espiritualidade, rituais e eventos da comunidade.
								</p>
								<Link
									to="/blog"
									className="mt-auto inline-flex items-center justify-between w-full py-2 px-3 bg-primary-50 text-primary-700 rounded-lg group-hover:bg-primary-100 transition-all duration-300"
								>
									<span className="font-medium">Ler artigos</span>
									<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</Link>
							</div>
						</motion.div>

						{/* Card 5: Loja */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							viewport={{ once: true }}
							className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-primary-100"
						>
							<div className="h-44 bg-primary-50 overflow-hidden relative">
								<img 
									src="/image/mestre5.webp" 
									alt="Loja Virtual" 
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70"></div>
								<div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
									<ShoppingBag className="h-6 w-6" />
								</div>
							</div>
							
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">Loja Virtual</h3>
								<p className="text-gray-600 mb-4 flex-1">
									Adquira produtos, livros e materiais relacionados à doutrina e espiritualidade.
								</p>
								<Link
									to="/loja"
									className="mt-auto inline-flex items-center justify-between w-full py-2 px-3 bg-primary-50 text-primary-700 rounded-lg group-hover:bg-primary-100 transition-all duration-300"
								>
									<span className="font-medium">Visitar loja</span>
									<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Conteúdos em Destaque - Visual Renovado */}
			<section className="section bg-earth-50 py-16">
				<div className="container-custom">
					<div className="flex flex-col md:flex-row items-center justify-between mb-12">
						<div>
							<div className="inline-flex items-center mb-3">
								<div className="h-6 w-1 bg-primary-500 rounded-full mr-3"></div>
								<span className="text-sm font-medium text-primary-600">Conteúdos Selecionados</span>
							</div>
							<h2 className="text-3xl font-semibold text-primary-800">Destaques da Semana</h2>
						</div>
						<div className="mt-4 md:mt-0">
							<Link
								to="/biblioteca"
								className="inline-flex items-center gap-2 py-2 px-4 border border-primary-300 rounded-lg text-primary-700 hover:bg-primary-50 transition-all duration-300"
							>
								<span>Ver toda a biblioteca</span>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M5 12h14"></path>
									<path d="m12 5 7 7-7 7"></path>
								</svg>
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Item 1 - Hinário */}
						<div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-500 hover:shadow-xl border border-primary-50 hover:border-primary-200">
							<div className="h-52 bg-gray-100 overflow-hidden relative">
								<img
									src="/image/mestre1.webp"
									alt="O Cruzeiro"
									className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								/>
								<div className="absolute top-4 right-4">
									<span className="inline-block px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg">Hinário</span>
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 hover:text-primary-600 transition-colors">
									O Cruzeiro
								</h3>
								<p className="text-gray-600 text-sm mb-4 line-clamp-3">
									Coletânea dos primeiros hinos recebidos pelo Mestre Irineu, fundamentais para a doutrina. Inclui partituras e histórico de cada hino.
								</p>
								<div className="flex items-center justify-between mt-2">
									<div className="flex items-center">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 mr-1">
											<path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										<span className="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR')}</span>
									</div>
									<Link to="/biblioteca?categoria=hinarios&id=1" className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1">
										Acessar <span className="text-sm">→</span>
									</Link>
								</div>
							</div>
						</div>

						{/* Item 2 - Áudio */}
						<div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-500 hover:shadow-xl border border-primary-50 hover:border-primary-200">
							<div className="h-52 bg-gray-100 overflow-hidden relative">
								<img
									src="/image/mestre2.png"
									alt="Hinos do Mestre Irineu"
									className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								/>
								<div className="absolute top-4 right-4">
									<span className="inline-block px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg">Áudio</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
									<div className="p-4">
										<button className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-all">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
												<path d="M8 5v14l11-7z" />
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 hover:text-primary-600 transition-colors">
									Hinos do Mestre Irineu
								</h3>
								<p className="text-gray-600 text-sm mb-4 line-clamp-3">
									Gravação restaurada dos hinos interpretados por seguidores diretos do Mestre Irineu. Edição comemorativa remasterizada.
								</p>
								<div className="flex items-center justify-between mt-2">
									<div className="flex items-center">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 mr-1">
											<path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										<span className="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR')}</span>
									</div>
									<Link to="/biblioteca?categoria=audio&id=2" className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1">
										Acessar <span className="text-sm">→</span>
									</Link>
								</div>
							</div>
						</div>

						{/* Item 3 - Vídeo */}
						<div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-500 hover:shadow-xl border border-primary-50 hover:border-primary-200">
							<div className="h-52 bg-gray-100 overflow-hidden relative">
								<img
									src="/image/mestre3.jpeg"
									alt="Escolinha de Musica do Mestre"
									className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								/>
								<div className="absolute top-4 right-4">
									<span className="inline-block px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg">Vídeo</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
									<button className="bg-white/20 hover:bg-white/30 p-4 rounded-full backdrop-blur-sm transition-all transform hover:scale-110">
										<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-white">
											<path d="M8 5v14l11-7z" />
										</svg>
									</button>
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-primary-800 mb-2 hover:text-primary-600 transition-colors">
									Escolinha de Música do Mestre
								</h3>
								<p className="text-gray-600 text-sm mb-4 line-clamp-3">
									Registro dos ensaios preparatórios para o Festival de 2025. Inclui entrevistas e demonstrações da técnica vocal.
								</p>
								<div className="flex items-center justify-between mt-2">
									<div className="flex items-center">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 mr-1">
											<path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										<span className="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR')}</span>
									</div>
									<Link to="/biblioteca?categoria=video&id=3" className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1">
										Acessar <span className="text-sm">→</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-10 md:py-12 bg-gradient-to-b from-white via-primary-100 to-primary-500">
				<div className="container-custom text-center max-w-xl mx-auto">
					<h2
						className="text-xl md:text-2xl font-display font-bold mb-3"
						style={{ color: '#665A43' }}
					>
						Junte-se à nossa comunidade
					</h2>
					<p
						className="max-w-lg mx-auto mb-5 text-sm md:text-base"
						style={{ color: '#665A43' }}
					>
						Faça parte de nossa rede e tenha acesso a conteúdos exclusivos, transmissões ao
						vivo e muito mais.
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						<Link
							to="/login"
							className="btn bg-white text-primary-700 hover:bg-primary-50 text-sm px-4 py-2"
						>
							Criar Conta
						</Link>
						<Link
							to="/contato"
							className="btn border border-white text-primary-700 hover:bg-primary-600 text-sm px-4 py-2"
						>
							Contato
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;

/* Adicione este CSS ao seu arquivo global ou tailwind.config.js para animação de borda
//
// @keyframes border-glow {
//   0% { box-shadow: 0 0 0 0 #fbbf24, 0 0 0 0 #6366f1; }
//   50% { box-shadow: 0 0 24px 8px #fbbf24, 0 0 32px 12px #6366f1; }
//   100% { box-shadow: 0 0 0 0 #fbbf24, 0 0 0 0 #6366f1; }
// }
// .animate-border-glow {
//   animation: border-glow 2.5s infinite;
// }
// .animate-pulse-border {
//   animation: border-glow 2.5s infinite;
// }
//
// Troque SEU_VIDEO_ID_AQUI pelo ID do vídeo do YouTube desejado. */