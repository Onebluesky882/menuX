import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data - in a real app, this would come from an API
const menuItems = [
  {
    id: "1",
    name: "Sushi Combo",
    description: "Assorted fresh sushi with wasabi and soy sauce",
    price: 25.99,
    category: "sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
    isPopular: true,
  },
  {
    id: "2",
    name: "Ramen",
    description: "Traditional Japanese noodle soup with pork belly and egg",
    price: 15.99,
    category: "noodles",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60",
    isPopular: true,
  },
  {
    id: "3",
    name: "Gyoza",
    description: "Pan-fried Japanese dumplings with pork and vegetables",
    price: 8.99,
    category: "appetizer",
    image:
      "https://images.unsplash.com/photo-1603893668327-d3a1fbfb4f6c?w=500&auto=format&fit=crop&q=60",
    isNew: true,
  },
  {
    id: "4",
    name: "Teriyaki Chicken",
    description: "Grilled chicken glazed with teriyaki sauce, served with rice",
    price: 18.99,
    category: "main",
    image:
      "https://images.unsplash.com/photo-1603894362358-5f2c5b9c8b7d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    name: "Miso Soup",
    description: "Traditional Japanese soup with tofu and seaweed",
    price: 4.99,
    category: "soup",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "6",
    name: "Matcha Ice Cream",
    description: "Green tea flavored ice cream",
    price: 6.99,
    category: "dessert",
    image:
      "https://images.unsplash.com/photo-1563802606589-0c3c2c4d5f5a?w=500&auto=format&fit=crop&q=60",
    isNew: true,
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "sushi", name: "Sushi" },
  { id: "noodles", name: "Noodles" },
  { id: "appetizer", name: "Appetizers" },
  { id: "main", name: "Mains" },
  { id: "soup", name: "Soups" },
  { id: "dessert", name: "Desserts" },
];

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: itemId, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, cartItem) => {
        const item = menuItems.find((menuItem) => menuItem.id === cartItem.id);
        return total + (item ? item.price * cartItem.quantity : 0);
      }, 0)
      .toFixed(2);
  };

  const renderItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <View
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4 mx-2"
      style={{ width: "45%" }}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-32 object-cover"
          resizeMode="cover"
        />
        {item.isPopular && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">Popular</Text>
          </View>
        )}
        {item.isNew && (
          <View className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">New</Text>
          </View>
        )}
      </View>
      <View className="p-3">
        <Text className="font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-600 text-sm mb-2">{item.description}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-lg">${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            onPress={() => addToCart(item.id)}
            className="bg-red-500 px-3 py-1 rounded-full"
          >
            <Text className="text-white font-bold">+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-600 p-4">
        <Text className="text-white text-2xl font-bold text-center">
          Sakura Japanese Cuisine
        </Text>
        <Text className="text-white text-center mt-1">
          Table #12 • 2 Guests
        </Text>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-2 border-b border-gray-200 bg-white"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 mx-1 rounded-full ${
              selectedCategory === category.id ? "bg-red-600" : "bg-gray-100"
            }`}
          >
            <Text
              className={`${
                selectedCategory === category.id
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items Grid */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* Cart Summary */}
      {cart.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center mr-2">
                <Text className="text-white font-bold">{getTotalItems()}</Text>
              </View>
              <Text className="font-bold">Items in cart</Text>
            </View>
            <Text className="font-bold">${getTotalPrice()}</Text>
          </View>
          <TouchableOpacity
            className="bg-red-600 py-3 rounded-lg items-center"
            onPress={() => {
              // Handle checkout
              alert("Proceeding to checkout!");
            }}
          >
            <Text className="text-white font-bold">View Cart & Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MenuScreen;
