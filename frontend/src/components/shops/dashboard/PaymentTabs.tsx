import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  QrCode,
  CreditCard,
  Building2,
  Smartphone,
} from "lucide-react";

interface PaymentInfo {
  qrCodeImage?: string;
  paymentType: "bank" | "promptpay" | "both";
  bankName: string;
  accountNumber: string;
  accountName: string;
  promptpayId: string;
  promptpayName: string;
  additionalInfo: string;
}

export const PaymentTab = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentType: "both",
    bankName: "Bangkok Bank",
    accountNumber: "123-456-7890",
    accountName: "My Coffee Shop Co., Ltd.",
    promptpayId: "0812345678",
    promptpayName: "My Coffee Shop",
    additionalInfo:
      "Please include your order number in the transfer description",
  });

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Payment Settings Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>QR Code Payment</CardTitle>
            <CardDescription>
              Upload your payment QR code for customers to scan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                {paymentInfo.qrCodeImage ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 bg-muted rounded-lg mx-auto flex items-center justify-center">
                      <QrCode size={48} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      QR Code uploaded successfully
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {}}>
                      Replace QR Code
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload
                      size={32}
                      className="mx-auto text-muted-foreground"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload your payment QR code
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supports PNG, JPG files up to 5MB
                      </p>
                      <Button onClick={() => {}}>Upload QR Code</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Configure your bank transfer and PromptPay details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select
                value={paymentInfo.paymentType}
                onValueChange={(value: "bank" | "promptpay" | "both") =>
                  handleInputChange("paymentType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer Only</SelectItem>
                  <SelectItem value="promptpay">PromptPay Only</SelectItem>
                  <SelectItem value="both">Both Methods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(paymentInfo.paymentType === "bank" ||
              paymentInfo.paymentType === "both") && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={20} className="text-primary" />
                  <h4 className="font-semibold">Bank Transfer Details</h4>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input
                    id="bank-name"
                    value={paymentInfo.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
                    placeholder="Enter bank name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    value={paymentInfo.accountNumber}
                    onChange={(e) =>
                      handleInputChange("accountNumber", e.target.value)
                    }
                    placeholder="Enter account number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input
                    id="account-name"
                    value={paymentInfo.accountName}
                    onChange={(e) =>
                      handleInputChange("accountName", e.target.value)
                    }
                    placeholder="Enter account holder name"
                  />
                </div>
              </div>
            )}

            {(paymentInfo.paymentType === "promptpay" ||
              paymentInfo.paymentType === "both") && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={20} className="text-primary" />
                  <h4 className="font-semibold">PromptPay Details</h4>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promptpay-id">PromptPay ID</Label>
                  <Input
                    id="promptpay-id"
                    value={paymentInfo.promptpayId}
                    onChange={(e) =>
                      handleInputChange("promptpayId", e.target.value)
                    }
                    placeholder="Phone number or ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promptpay-name">PromptPay Name</Label>
                  <Input
                    id="promptpay-name"
                    value={paymentInfo.promptpayName}
                    onChange={(e) =>
                      handleInputChange("promptpayName", e.target.value)
                    }
                    placeholder="Enter registered name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                value={paymentInfo.additionalInfo}
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
                placeholder="Additional payment instructions for customers..."
                rows={3}
              />
            </div>

            <Button onClick={() => {}} className="w-full">
              Save Payment Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Preview</CardTitle>
          <CardDescription>
            How customers will see your payment information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* QR Code Section */}
            <div className="text-center">
              <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center mb-4">
                <QrCode size={64} className="text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold mb-2">Scan to Pay</p>
              <p className="text-sm text-muted-foreground">
                Use your banking app to scan this QR code
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold">Alternative Payment Methods</h4>

              {(paymentInfo.paymentType === "bank" ||
                paymentInfo.paymentType === "both") && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={16} className="text-primary" />
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank:</span>
                      <span>{paymentInfo.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account:</span>
                      <span className="font-mono">
                        {paymentInfo.accountNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{paymentInfo.accountName}</span>
                    </div>
                  </div>
                </div>
              )}

              {(paymentInfo.paymentType === "promptpay" ||
                paymentInfo.paymentType === "both") && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone size={16} className="text-primary" />
                    <span className="font-medium">PromptPay</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono">
                        {paymentInfo.promptpayId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{paymentInfo.promptpayName}</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentInfo.additionalInfo && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {paymentInfo.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
