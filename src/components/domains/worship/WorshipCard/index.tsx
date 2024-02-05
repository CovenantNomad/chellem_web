import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceName } from "@/lib/utils";
import { TWorshipCard } from "@/types/worship.types";
import Link from "next/link";

const WorshipCard = ({ worship }: { worship: TWorshipCard }) => {

  return (
    <Link href={`/worship/${worship.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{getServiceName(worship.serviceType)}</CardTitle>
          <CardDescription>{worship.title && worship.title + " | "}  {worship.script}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {worship.pastors?.id === 999 ? (
              <span>{worship.pastors.name}{' - '}{worship.invited_lecturer}</span>
            ) : (
              <span>{worship.pastors?.name}{' '}{worship.pastors?.position}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WorshipCard;
