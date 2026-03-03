const Approach = () => {
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Consult",
      description: "Requirement analysis and environment assessment.",
      color: "bg-blue-600"
    },
    {
      id: 2,
      number: "02",
      title: "Design",
      description: "Custom architecture and system planning.",
      color: "bg-green-600"
    },
    {
      id: 3,
      number: "03",
      title: "Integrate",
      description: "Professional installation and system configuration.",
      color: "bg-purple-600"
    },
    {
      id: 4,
      number: "04",
      title: "Optimize",
      description: "Testing, calibration, and performance validation.",
      color: "bg-orange-600"
    },
    {
      id: 5,
      number: "05",
      title: "Support",
      description: "Lifecycle management and technical assistance.",
      color: "bg-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Approach</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A systematic methodology ensuring successful project delivery
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className={`${step.color} p-6 rounded-lg h-full hover:scale-105 transition-transform`}>
                <div className="text-4xl font-bold text-white opacity-30 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-gray-200">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-white rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;