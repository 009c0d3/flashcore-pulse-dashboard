
import React from "react";

const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="bg-gradient-to-r from-flashcore-purple/10 via-flashcore-green/10 to-flashcore-orange/10 rounded-2xl p-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-flashcore-purple mb-2">10K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-flashcore-green mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-flashcore-orange mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-flashcore-purple mb-2">150+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
