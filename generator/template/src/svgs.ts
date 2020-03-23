const req = require.context('@/assets/svgs', false, /\.svg$/);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);

requireAll(req);
