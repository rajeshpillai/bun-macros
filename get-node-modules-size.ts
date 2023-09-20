export const getNodeModuleSizes = async () => {
  const modules = await new Promise (resolve =>  }).toString();i
  const total = modules.reduce((acc, {size}) => acc + size, 0);

  return modules.map(({module, size}) => ({
    module,
    size: size > 1024 ? `${Math.round(size / 1024)} MB` : `${size} Kb`,
    percent: Math.round((size / total) * 100),
  }));
}
