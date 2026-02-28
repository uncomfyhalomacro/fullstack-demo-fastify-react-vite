import unit from "unitmath";

const insertUnitSystem = (model) => {
  if (model.unit && typeof model.unit === "string") {
    try {
      const u = unit(1, model.unit);
      model.unit_system = u.getInferredSystem().toString();
    } catch (err) {
      throw new Error(`Invalid unit: ${model.unit}`);
    }
  } else {
    model.unit_system = null;
  }
};

export { insertUnitSystem };
