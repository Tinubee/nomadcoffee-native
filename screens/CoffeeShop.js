import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import ShopInfo from "../components/ShopInfo";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      user {
        username
        avatarURL
      }
      userId
      name
      caption
      latitude
      longitude
      photos {
        id
        url
      }
      categories {
        category
      }
      isMine
    }
  }
`;

export default function CoffeeShop({ navigation, route }) {
  const {
    params: { id },
  } = route;

  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id },
  });

  return (
    <ScreenLayout>
      <ShopInfo
        id={id}
        name={data?.seeCoffeeShop?.name}
        longitude={data?.seeCoffeeShop?.longitude}
        latitude={data?.seeCoffeeShop?.latitude}
        data={data?.seeCoffeeShop}
        category={data?.seeCoffeeShop?.categories}
      />
    </ScreenLayout>
  );
}
