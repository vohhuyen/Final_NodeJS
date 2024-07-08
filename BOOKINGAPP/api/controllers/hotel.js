import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
//CREATE
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)
    
    try{
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    }catch(err){
        next(err);
    }
}
//UPDATE
export const updateHotel = async (req, res, next)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true}
        );
        res.status(200).json(updateHotel);
    } catch(err){
        res.status(500).json(err);
    }
};
//DELETE
export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has been deleted.")
    }catch(err){
        next(err);
    }
}
//GET 
export const getHotel = async (req, res, next) => {
  try {
    console.log("Fetching hotel with ID:", req.params.id); // Thêm log để kiểm tra ID
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (err) {
    console.error("Error fetching hotel:", err); // Thêm log để kiểm tra lỗi
    next(err);
  }
};

//GET ALL
export const getHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    
    // Chuyển đổi min và max thành số nguyên
    const minValue = parseInt(min) || 1; // Giá trị mặc định là 1 nếu min không có giá trị hợp lệ
    const maxValue = parseInt(max) || 999; // Giá trị mặc định là 999 nếu max không có giá trị hợp lệ
    const limitValue = parseInt(limit); // Giá trị giới hạn là số nguyên dương 

    try {
        // Sử dụng $gt và $lt để so sánh cheapestPrice
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: minValue, $lt: maxValue }
        }).limit(req.query.limit); // Giới hạn số lượng kết quả, mặc định là 10 nếu không có giới hạn

        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    const newHotel = new Hotel(req.body)
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
}

export const countByType = async (req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            {type:"hotel", count: hotelCount},
            {type:"apartment", count: apartmentCount},
            {type:"resort", count: resortCount},
            {type:"villas", count: villaCount},
            {type:"cabins", count: cabinCount},
        ]);
    }catch(err){
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };