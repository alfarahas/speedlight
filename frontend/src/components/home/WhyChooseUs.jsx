const WhyChooseUs = () => {
  const benefits = [
    {
      id: 1,
      icon: "🔹",
      title: "Enterprise-focused design approach",
      description: "Tailored solutions for complex business requirements with scalability in mind"
    },
    {
      id: 2,
      icon: "🔹",
      title: "Vendor-neutral technology advisory",
      description: "Unbiased recommendations ensuring the best solutions for your specific needs"
    },
    {
      id: 3,
      icon: "🔹",
      title: "Certified engineering & installation teams",
      description: "Industry-certified professionals with years of hands-on experience"
    },
    {
      id: 4,
      icon: "🔹",
      title: "Scalable and future-ready architecture",
      description: "Solutions designed to grow with your business and adapt to future technologies"
    },
    {
      id: 5,
      icon: "🔹",
      title: "Long-term lifecycle support",
      description: "Comprehensive maintenance and support throughout your system's lifecycle"
    },
    {
      id: 6,
      icon: "🔹",
      title: "Proven multi-domain integration capability",
      description: "Seamless integration across audio, video, IT, and control systems"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Speedlight Infosolutions?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just install systems — we engineer intelligent environments
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4">{benefit.icon}</span>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;