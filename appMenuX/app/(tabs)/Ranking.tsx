import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItem = {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  isNew?: boolean;
  orderCount?: number;
};

// Mock data for today's top picks
const topPicks: MenuItem[] = [
  {
    id: "1",
    name: "Spicy Tuna Roll",
    restaurant: "Sakura Sushi",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    id: "2",
    name: "Tonkotsu Ramen",
    restaurant: "Tokyo Ramen",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
  },
];

// Mock data for new menu items
const newItems: MenuItem[] = [
  {
    id: "3",
    name: "Truffle Udon",
    restaurant: "Udon House",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1632818924360-68d4994cfdb2",
    isNew: true,
  },
  {
    id: "4",
    name: "Matcha Tiramisu",
    restaurant: "Dessert Bar",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1624726175513-19b9baf9fbd1",
    isNew: true,
  },
];

// Mock data for most popular items
const popularItems: MenuItem[] = [
  {
    id: "5",
    name: "Chicken Katsu Don",
    restaurant: "Donburi House",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    orderCount: 42,
  },
  {
    id: "6",
    name: "Beef Yakiniku",
    restaurant: "Yakiniku Master",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1603899665317-5f847a94cc4c",
    orderCount: 38,
  },
];

const FoodCard = ({ item }: { item: MenuItem }) => (
  <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
    <View className="flex-row">
      <Image
        source={{ uri: item.image }}
        className="w-24 h-24 rounded-lg mr-4"
      />
      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-bold">{item.name}</Text>
          {item.isNew && (
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-800 text-xs font-medium">New</Text>
            </View>
          )}
        </View>
        <Text className="text-gray-500 text-sm">{item.restaurant}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-bold">${item.price.toFixed(2)}</Text>
          {item.orderCount && (
            <View className="flex-row items-center">
              <Ionicons name="flame" size={16} color="#EF4444" />
              <Text className="text-red-500 text-sm ml-1">
                {item.orderCount} orders
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  </View>
);

const SectionHeader = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => (
  <View className="flex-row justify-between items-center mb-3">
    <Text className="text-xl font-bold">{title}</Text>
    {onPress && (
      <TouchableOpacity onPress={onPress}>
        <Text className="text-red-500">See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

const RankingScreen = () => {
  const handleSeeAll = (section: string) => {
    // Handle see all for each section
    console.log(`See all ${section}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Today's Top Picks */}
        <SectionHeader title="🔥 Today's Top Picks" />
        {topPicks.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}

        {/* New Menu Items */}
        <SectionHeader
          title="✨ New to Try"
          onPress={() => handleSeeAll("new")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {newItems.map((item) => (
            <View key={item.id} className="w-48 mr-4">
              <Image
                source={{ uri: item.image }}
                className="w-full h-32 rounded-lg mb-2"
              />
              <Text className="font-medium">{item.name}</Text>
              <Text className="text-gray-500 text-sm">{item.restaurant}</Text>
              <Text className="font-medium">${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Most Popular */}
        <SectionHeader
          title="👑 Most Popular This Month"
          onPress={() => handleSeeAll("popular")}
        />
        {popularItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RankingScreen;
