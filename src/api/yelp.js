import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer upurCTKQtDsNdbFqh0NxCNLDCA6s_iRydAUp6yEpJaiL6Ws8GbHQdd32HpVcv2LOa08xLPIQbH-8PnMR83gDWG0Ru0NkLWT570XAQR6k5r2LxJDJNOrFsZlYi3xXX3Yx",
  },
});
