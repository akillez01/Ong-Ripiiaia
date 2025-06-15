import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Calendar, MessageCircle, Newspaper, Users, Video } from "lucide-react";
import { Link } from "react-router-dom";

const comunicacaoCards = [
	{
		title: "Notícias",
		description:
			"Fique por dentro das novidades, reportagens e atualizações do universo Ripi Iaiá.",
		icon: Newspaper,
		color: "primary-600",
	},
	{
		title: "Eventos",
		description:
			"Participe de encontros, cerimônias, lives e eventos especiais da comunidade.",
		icon: Calendar,
		color: "accent-600",
	},
	{
		title: "Interação",
		description:
			"Espaço para troca de ideias, perguntas, depoimentos e construção coletiva.",
		icon: Users,
		color: "secondary-600",
	},
	{
		title: "Multimídia",
		description:
			"Galeria de vídeos, podcasts, transmissões e conteúdos audiovisuais.",
		icon: Video,
		color: "earth-700",
	},
	{
		title: "Jornalismo",
		description:
			"Cobertura jornalística, reportagens investigativas e análises críticas sobre temas relevantes.",
		icon: Newspaper,
		color: "primary-700",
	},
	{
		title: "Documentários",
		description:
			"Produções audiovisuais que exploram a cultura, espiritualidade e histórias da floresta e do mundo.",
		icon: Video,
		color: "accent-700",
	},
	{
		title: "Estudos Científicos e Doutorados",
		description:
			"Espaço para divulgação de pesquisas acadêmicas, teses, dissertações e avanços científicos ligados à Amazônia e espiritualidade.",
		icon: Users,
		color: "secondary-700",
	},
];

const Comunicacao = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-earth-100 text-primary-900 font-body">
			<header className="bg-white/90 backdrop-blur-md border-b border-earth-200 sticky top-0 z-40 shadow-sm">
				<div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<Link
							to="/"
							className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
						>
							<ArrowLeft className="w-6 h-6" />
							<span>Voltar à Home</span>
						</Link>
						<MessageCircle className="w-8 h-8 text-primary-600" />
						<h1 className="text-2xl md:text-3xl font-bold text-primary-900">
							Comunicação
						</h1>
					</div>
					<Badge className="bg-primary-500/90 text-white border-primary-400/50 text-base px-4 py-2 shadow">
						Conectando Ideias e Pessoas
					</Badge>
				</div>
			</header>

			<section className="py-16 px-4">
				<div className="container mx-auto max-w-3xl text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900">
						Plataforma de comunicação unificada
					</h2>
					<p className="text-lg md:text-xl text-primary-800 mb-6 font-medium">
						para notícias, eventos e interação com a comunidade Ripi Iaiá. Voz e
						informação.
					</p>
				</div>
				<div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{comunicacaoCards.map((item, idx) => {
						const Icon = item.icon;
						return (
							<Card
								key={idx}
								className="bg-white border border-primary-100 hover:shadow-lg transition-all duration-300 group overflow-hidden relative"
							>
								<CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
									<div
										className={`w-16 h-16 rounded-full flex items-center justify-center bg-${item.color}/10 border-2 border-${item.color} mb-2`}
									>
										<Icon className={`w-8 h-8 text-${item.color}`} />
									</div>
									<CardTitle
										className={`text-lg font-bold text-${item.color}`}
									>
										{item.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="text-center pb-8">
									<CardDescription className="text-primary-800 mb-4 min-h-[60px]">
										{item.description}
									</CardDescription>
									<Button
										asChild
										className={`w-full bg-${item.color} hover:bg-${item.color}/90 text-white`}
									>
										<a href="#">Acessar</a>
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>
		</div>
	);
};

export default Comunicacao;
