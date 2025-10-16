import { Ionicons } from "@expo/vector-icons";
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

// Mock data for order history

type itemProps = {
  id: string;
  date: string;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  restaurant: string;
};
const orderHistory: itemProps[] = [
  {
    id: "1",
    date: "Today, 12:30 PM",
    status: "Delivered",
    items: [
      { name: "Sushi Combo", quantity: 1, price: 25.99 },
      { name: "Miso Soup", quantity: 2, price: 4.99 },
    ],
    total: 35.97,
    restaurant: "Sakura Sushi Bar",
  },
  {
    id: "2",
    date: "Yesterday, 7:15 PM",
    status: "Delivered",
    items: [
      { name: "Ramen", quantity: 1, price: 15.99 },
      { name: "Gyoza", quantity: 1, price: 8.99 },
    ],
    total: 24.98,
    restaurant: "Tokyo Ramen House",
  },
];

// Mock data for cart items
const cartItems = [
  {
    id: "1",
    name: "Sushi Combo",
    price: 25.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Miso Soup",
    price: 4.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
  },
];

const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const renderOrderItem = ({ item }: any) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold">{item.restaurant}</Text>
        <Text className="text-gray-500">{item.date}</Text>
      </View>
      <View className="mb-3">
        {item.items.map((orderItem: any, index: number) => (
          <View key={index} className="flex-row justify-between">
            <Text className="text-gray-600">
              {orderItem.quantity}x {orderItem.name}
            </Text>
            <Text className="font-medium">${orderItem.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <View className="flex-row items-center">
          <Ionicons
            name="checkmark-circle"
            size={16}
            color="#10B981"
            style={{ marginRight: 4 }}
          />
          <Text className="text-green-500 font-medium">{item.status}</Text>
        </View>
        <Text className="text-lg font-bold">${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderCartItem = ({ item }: any) => (
    <View className="flex-row items-center py-3 border-b border-gray-100">
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 rounded-lg mr-3"
      />
      <View className="flex-1">
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-gray-500">${item.price.toFixed(2)}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity className="w-8 h-8 items-center justify-center bg-gray-100 rounded-full">
          <Text className="text-lg">-</Text>
        </TouchableOpacity>
        <Text className="mx-3 w-6 text-center">{item.quantity}</Text>
        <TouchableOpacity className="w-8 h-8 items-center justify-center bg-red-100 rounded-full">
          <Text className="text-lg text-red-600">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pt-4 pb-3 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold">My Orders</Text>
            <Text className="text-gray-500">Track your orders</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowCart(true)}
            className="relative"
          >
            <Ionicons name="cart-outline" size={28} color="#000" />
            {totalItems > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs">{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-200">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${
              activeTab === "current" ? "border-b-2 border-red-500" : ""
            }`}
            onPress={() => setActiveTab("current")}
          >
            <Text
              className={`font-medium ${
                activeTab === "current" ? "text-red-500" : "text-gray-500"
              }`}
            >
              Current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${
              activeTab === "history" ? "border-b-2 border-red-500" : ""
            }`}
            onPress={() => setActiveTab("history")}
          >
            <Text
              className={`font-medium ${
                activeTab === "history" ? "text-red-500" : "text-gray-500"
              }`}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {activeTab === "current" ? (
          <View className="bg-white rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold">Sakura Sushi Bar</Text>
              <Text className="text-gray-500">Preparing</Text>
            </View>
            <View className="mb-3">
              {cartItems.map((item, index) => (
                <View key={index} className="flex-row justify-between py-1">
                  <Text className="text-gray-600">
                    {item.quantity}x {item.name}
                  </Text>
                  <Text className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
            <View className="pt-3 border-t border-gray-100">
              <View className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <View
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Estimated delivery</Text>
                <Text className="font-medium">12:45 PM</Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={orderHistory}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      {/* Cart Modal */}
      {showCart && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-3/4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Your Cart</Text>
              <TouchableOpacity onPress={() => setShowCart(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id}
              className="mb-4"
              showsVerticalScrollIndicator={false}
            />

            <View className="mt-auto">
              <View className="flex-row justify-between mb-4">
                <Text className="text-gray-500">Subtotal</Text>
                <Text className="font-bold">${subtotal}</Text>
              </View>
              <View className="flex-row justify-between mb-6">
                <Text className="text-gray-500">Delivery Fee</Text>
                <Text className="font-bold">$2.99</Text>
              </View>
              <View className="flex-row justify-between mb-6">
                <Text className="text-lg font-bold">Total</Text>
                <Text className="text-lg font-bold">
                  ${(parseFloat(subtotal) + 2.99).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-red-600 py-4 rounded-xl items-center"
                onPress={() => {
                  // Handle checkout
                  alert("Proceeding to checkout!");
                }}
              >
                <Text className="text-white font-bold text-lg">Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
