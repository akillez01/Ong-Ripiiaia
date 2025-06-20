import { motion } from 'framer-motion';
import { Book, Play, Radio, ShoppingBag } from 'lucide-react';
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
		icon: <Radio className="h-10 w-10 text-primary-600" />,
		title: 'Rádio Ripi ia iá',
		description: 'Ouça nossa programação com hinários e cantos da doutrina.',
		link: '/radio',
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
						<h2 className="section-title mb-4">Bem-vindo ao Ripi Iaiá</h2>
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
			<section className="section relative overflow-hidden">
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
					<h2 className="section-title text-center mb-12">{t('blog')}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="card p-6 flex flex-col items-center text-center"
							>
								<div className="mb-4 p-3 bg-primary-50 rounded-full">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 mb-4">{feature.description}</p>
								{feature.external ? (
									<a
										href={feature.link}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-auto text-primary-600 font-medium hover:text-primary-700"
									>
										Acessar →
									</a>
								) : (
									<Link
										to={feature.link}
										className="mt-auto text-primary-600 font-medium hover:text-primary-700"
									>
										Acessar →
									</Link>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Recent Additions */}
			<section className="section bg-earth-50">
				<div className="container-custom">
					<div className="flex items-center justify-between mb-8">
						<h2 className="section-title mb-0">Adições Recentes</h2>
						<Link
							to="/acervo"
							className="text-primary-600 font-semibold hover:text-primary-700"
						>
							Ver tudo →
						</Link>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								id: 1,
								type: 'Hinário',
								title: 'O Cruzeiro',
								image: '/image/mestre1.webp',
								desc: 'Coletânea dos primeiros hinos recebidos pelo Mestre Irineu, fundamentais para a doutrina.',
							},
							{
								id: 2,
								type: 'Áudio',
								title: 'Hinos do Mestre Irineu',
								image: '/image/mestre2.png',
								desc: 'Gravação restaurada dos hinos interpretados por seguidores diretos do Mestre Irineu.',
							},
							{
								id: 3,
								type: 'Vídeo',
								title: 'Escolinha de Musica do Mestre',
								image: '/image/mestre3.jpeg',
								desc: 'Registro dos ensaios preparatórios para o Festival de 2025.',
							},
						].map((item) => (
							<div key={item.id} className="card overflow-hidden">
								<div className="h-48 bg-gray-200">
									<img
										src={item.image}
										alt={item.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-4">
									<span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-3">
										{item.type}
									</span>
									<h3 className="text-lg font-semibold mb-2">
										{item.title}
									</h3>
									<p className="text-gray-600 text-sm mb-3 line-clamp-2">
										{item.desc}
									</p>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">
											Adicionado: {new Date().toLocaleDateString('pt-BR')}
										</span>
										<Link
											to={`/acervo/item-${item.id}`}
											className="text-primary-600 hover:text-primary-700 text-sm font-medium"
										>
											Acessar
										</Link>
									</div>
								</div>
							</div>
						))}
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