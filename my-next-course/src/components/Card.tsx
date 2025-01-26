import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

interface CardComponentProps {
  product: {
    _id: string;
    title: string;
    thumbnail: string;
    price: number;
    excerpt: string;
  };
  onAddToWishlist: () => void;
  onSeeDetail: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  product,
  onAddToWishlist,
  onSeeDetail,
}) => {
  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        <Image
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          width={500}
          height={500}
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {product.excerpt}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex flex-col gap-2">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          onClick={onAddToWishlist}
        >
          Add to Wishlist
        </Button>
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          onClick={onSeeDetail}
        >
          See Detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
