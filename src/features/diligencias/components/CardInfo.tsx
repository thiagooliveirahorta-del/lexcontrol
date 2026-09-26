import {
    Building2,
    Landmark,
    FileText,
    Calendar,
    Clock3,
    MapPin,
} from "lucide-react";

type Props = {
    contratante: string;
    tribunal: string;
    comarca: string;
    endereco?: string;
    data: string;
    hora: string;
};

export default function CardInfo({
    contratante,
    tribunal,
    comarca,
    endereco,
    data,
    hora,
}: Props) {
    return (
        <div className="mt-6 grid gap-3 md:grid-cols-2">

            <div className="flex items-center gap-2">
                <Building2 size={18} />
                <span>{contratante}</span>
            </div>

            <div className="flex items-center gap-2">
                <Landmark size={18} />
                <span>{tribunal}</span>
            </div>

            <div className="flex items-center gap-2">
                <FileText size={18} />
                <span>{comarca}</span>
            </div>

            <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{data}</span>
            </div>

            <div className="flex items-center gap-2">
                <Clock3 size={18} />
                <span>{hora}</span>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
                <MapPin size={18} />
                <span>
                    {endereco || "Endereço não informado"}
                </span>
            </div>

        </div>
    );
}