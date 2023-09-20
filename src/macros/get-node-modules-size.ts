export const getNodeModuleSizes = async () => {
  const modules = await new Promise (resolve => {
    Bun.spawn(["/bin/bash", `${process.cwd()}/scripts/get-node-modules-size.sh`], {
      onExit: async (proc, exitCode) => {
        if (exitCode === 0) {
          const output = await new Response(
            proc.stdout as ReadableStream 
          ).text();
          resolve(
            output
              .split("\n")
              .filter(line => line)
              .map(line => line.split(","))
              .map(([module, size]) => ({ module, size: + size }))
          );
        } else {
          resolve([]);
        }
      },
    }).toString();
  });
  
  const total = modules.reduce((acc, {size}) => acc + size, 0);

  return modules.map(({module, size}) => ({
    module,
    size: size > 1024 ? `${Math.round(size / 1024)} MB` : `${size} Kb`,
    percent: Math.round((size / total) * 100),
  }));
}
