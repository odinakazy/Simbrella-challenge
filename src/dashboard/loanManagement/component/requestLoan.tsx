import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loanSchema = z.object({
  amount: z
    .number()
    .min(1000, "Minimum loan amount is 1000")
    .max(1000000, "Maximum loan amount is 1000000"),
  tenure: z
    .number()
    .min(1, "Minimum tenure is 1 month")
    .max(120, "Maximum tenure is 120 months"),
  purpose: z.string().min(10, "Purpose must be at least 10 characters long"),
});

// Infer TypeScript type from Zod schema
type LoanFormData = z.infer<typeof loanSchema>;

const RequestLoan: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    mode: "onChange", // Validate on change
  });

  // Submit handler
  const onSubmit = (data: LoanFormData) => {
    console.log("Loan Request Data:", data);
    reset(); // Clear the form after submission
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Request a New Loan</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        {/* Loan Amount */}
        <div>
          <Label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Amount
          </Label>
          <Input
            type="number"
            id="amount"
            {...register("amount", { valueAsNumber: true })}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        {/* Loan Tenure */}
        <div>
          <Label
            htmlFor="tenure"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Tenure (months)
          </Label>
          <Input
            type="number"
            id="tenure"
            {...register("tenure", { valueAsNumber: true })}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.tenure && (
            <p className="text-red-500 text-sm">{errors.tenure.message}</p>
          )}
        </div>

        {/* Loan Purpose */}
        <div>
          <Label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Purpose
          </Label>
          <Textarea
            id="purpose"
            {...register("purpose")}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.purpose && (
            <p className="text-red-500 text-sm">{errors.purpose.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid} // Disable button until form is valid
          className={`w-full py-3 rounded-lg text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Request Loans
        </Button>
      </form>
    </div>
  );
};

export default RequestLoan;
