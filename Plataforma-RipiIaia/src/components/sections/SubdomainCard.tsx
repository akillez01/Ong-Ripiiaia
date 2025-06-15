
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SubdomainCardProps {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  route: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  features: string[];
}

const SubdomainCard = ({
  title,
  subtitle,
  description,
  url,
  route,
  icon: IconComponent,
  color,
  hoverColor,
  features
}: SubdomainCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {url}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-gray-800">{title}</CardTitle>
        <CardDescription className="text-emerald-600 font-medium">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, featureIndex) => (
            <Badge key={featureIndex} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        <Button 
          className={`w-full mt-4 ${color} ${hoverColor} text-white`}
          asChild
        >
          <Link to={route}>
            Acessar {title}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubdomainCard;
