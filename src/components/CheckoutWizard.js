export default function CheckoutWizard({ activeStep = 0}) {
    return (
        <div className="mb-5 flex flex-wrap">
            {['user Login', 'Shipping Address', 'Payment Method', 'Place Order'].map (
                (step, index) => (
                    <div
                    key={step}
                    className={`flex-1 border-b-2 text-center
                    ${
                        index <= activeStep 
                        ? 'border-amber-500 text-red-500'
                        : 'border-gray-300 text-gray-600'
                    }
                    
                     `}
                    >
                        {step}
                    </div>
                )
            )}
        </div>
    )
}