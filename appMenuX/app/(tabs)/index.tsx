import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data
const categories = [
  { id: "1", name: "Food", icon: "fast-food" },
  { id: "2", name: "Drinks", icon: "cafe" },
  { id: "3", name: "Desserts", icon: "ice-cream" },
  { id: "4", name: "Asian", icon: "restaurant" },
  { id: "5", name: "Pizza", icon: "pizza" },
];

const nearbyRestaurants = [
  {
    id: "1",
    name: "Sakura Sushi",
    category: "Japanese • Sushi",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    id: "2",
    name: "Burger King",
    category: "Fast Food • American",
    rating: 4.2,
    deliveryTime: "15-25 min",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
  },
  {
    id: "3",
    name: "Pizza Hut",
    category: "Italian • Pizza",
    rating: 4.3,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-500 text-sm">Deliver to</Text>
            <View className="flex-row items-center">
              <Text className="text-lg font-bold">Current Location</Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </View>
          </View>
          <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="person" size={20} color="#000" />
          </View>
        </View>

        {/* Search Bar */}
        <View className="relative">
          <TextInput
            placeholder="Search for food, restaurants, or cuisines"
            className="bg-gray-100 rounded-full py-3 px-5 pl-12 text-base"
            placeholderTextColor="#9CA3AF"
          />
          <Ionicons
            name="search"
            size={20}
            color="#9CA3AF"
            style={{ position: "absolute", left: 16, top: 16 }}
          />
        </View>
      </View>

      {/* Categories */}
      <View className="px-4 py-4 border-b border-gray-100">
        <Text className="text-lg font-bold mb-3">Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className="items-center"
              activeOpacity={0.7}
            >
              <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-2">
                <Ionicons size={24} color="#EF4444" />
              </View>
              <Text className="text-xs text-center">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Restaurants */}
      <ScrollView className="flex-1 px-4 py-4">
        <Text className="text-lg font-bold mb-3">Nearby Restaurants</Text>

        {nearbyRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            className="flex-row mb-4 bg-white rounded-xl shadow-sm p-3"
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: restaurant.image }}
              className="w-24 h-24 rounded-lg"
            />
            <View className="flex-1 ml-3 justify-between">
              <View>
                <Text className="font-bold text-base">{restaurant.name}</Text>
                <Text className="text-gray-500 text-sm">
                  {restaurant.category}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="ml-1 font-medium">{restaurant.rating}</Text>
                </View>
                <Text className="text-gray-500 text-sm">
                  {restaurant.deliveryTime}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
