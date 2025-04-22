
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { SubscriptionPlan } from "@/types";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Edit, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Subscriptions() {
  const { t } = useTranslation();
  const { subscriptionPlans } = useApp();
  const [plans, setPlans] = useState<SubscriptionPlan[]>(subscriptionPlans);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan({ ...plan });
    setIsDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingPlan) return;

    const { name, value } = e.target;
    
    if (name === "price" || name === "maxProducts" || name === "maxBranches" || name === "maxRegisters") {
      setEditingPlan({
        ...editingPlan,
        [name]: Number(value),
      });
    } else {
      setEditingPlan({
        ...editingPlan,
        [name]: value,
      });
    }
  };

  const handleToggleFeature = (feature: "allowsInstallments" | "allowsMultipleCurrencies") => {
    if (!editingPlan) return;
    
    setEditingPlan({
      ...editingPlan,
      [feature]: !editingPlan[feature],
    });
  };

  const handleSavePlan = () => {
    if (!editingPlan) return;

    setPlans((prev) =>
      prev.map((plan) =>
        plan.tier === editingPlan.tier ? editingPlan : plan
      )
    );

    setIsDialogOpen(false);
    toast.success(`Subscription plan "${editingPlan.name}" updated successfully`);
  };

  const getFeatureList = (plan: SubscriptionPlan) => {
    return [
      `${plan.maxProducts === Infinity ? "Unlimited" : plan.maxProducts} products`,
      `${plan.maxBranches === Infinity ? "Unlimited" : plan.maxBranches} branches`,
      `${plan.maxRegisters === Infinity ? "Unlimited" : plan.maxRegisters} registers`,
      ...(plan.allowsInstallments ? ["Installment payments"] : []),
      ...(plan.allowsMultipleCurrencies ? ["Multi-currency support"] : []),
      ...plan.features,
    ];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("subscriptions")}</h1>
        <p className="text-muted-foreground mt-1">
          Manage subscription plans and pricing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.tier}
            className={`
              flex flex-col
              ${
                plan.tier === "free"
                  ? "border-gray-200"
                  : plan.tier === "silver"
                  ? "border-slate-300"
                  : plan.tier === "gold"
                  ? "border-amber-300"
                  : plan.tier === "platinum"
                  ? "border-slate-500"
                  : "border-violet-400"
              }
              ${
                plan.tier === "gold"
                  ? "bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent"
                  : plan.tier === "vip"
                  ? "bg-gradient-to-b from-violet-50 to-transparent dark:from-violet-950/20 dark:to-transparent"
                  : ""
              }
            `}
          >
            <CardHeader>
              <CardTitle className={`text-center text-xl ${plan.tier === "vip" ? "text-violet-600 dark:text-violet-400" : ""}`}>
                {plan.name}
              </CardTitle>
              <CardDescription className="text-center">
                {plan.tier === "free" ? "Free Forever" : "Monthly Subscription"}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center flex-grow">
              <div className="text-3xl font-bold mb-4">
                {new Intl.NumberFormat().format(plan.price)} UZS
                {plan.tier === "free" && <span className="text-sm ml-1">/month</span>}
              </div>

              <ul className="text-sm space-y-2 text-left">
                {getFeatureList(plan).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <Button
                onClick={() => handleEditPlan(plan)}
                variant="outline"
                className="w-full"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the details for this subscription plan.
            </DialogDescription>
          </DialogHeader>

          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Plan Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editingPlan.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (UZS)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={editingPlan.price}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxProducts" className="text-right">
                  Products Limit
                </Label>
                <Input
                  id="maxProducts"
                  name="maxProducts"
                  type="number"
                  value={editingPlan.maxProducts === Infinity ? 999999 : editingPlan.maxProducts}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxBranches" className="text-right">
                  Branches Limit
                </Label>
                <Input
                  id="maxBranches"
                  name="maxBranches"
                  type="number"
                  value={editingPlan.maxBranches === Infinity ? 999999 : editingPlan.maxBranches}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxRegisters" className="text-right">
                  Registers Limit
                </Label>
                <Input
                  id="maxRegisters"
                  name="maxRegisters"
                  type="number"
                  value={editingPlan.maxRegisters === Infinity ? 999999 : editingPlan.maxRegisters}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Features</Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="allowsInstallments"
                      checked={editingPlan.allowsInstallments}
                      onChange={() => handleToggleFeature("allowsInstallments")}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="allowsInstallments">
                      Installment Payments
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="allowsMultipleCurrencies"
                      checked={editingPlan.allowsMultipleCurrencies}
                      onChange={() => handleToggleFeature("allowsMultipleCurrencies")}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="allowsMultipleCurrencies">
                      Multi-currency Support
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSavePlan} className="pos-button">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
