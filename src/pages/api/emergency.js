export default function handler(req, res) {
    if (req.method === "POST") {
      const { address, details } = req.body;
      res.status(200).json({
        emergencyLocation: { lat: 13.348201, lng: 74.742061 },
        route: "Sample route data",
        nearestHospital: { name: "City Hospital", address: "City Hospital Building, Mallikatte Rd, Mallikatte, Kadri, Mangaluru, Karnataka 575002" },
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  