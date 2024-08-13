export default function OrderCompletePage() {
    
    return (
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg text-3xl rounded-lg">
           <h1>Order Confirmed</h1>
           <p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
            <p>Return to <a href="/" className="text-red-600">Home</a>.</p>
    </div>
    );
  }