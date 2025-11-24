const Footer = () => {
  return (
    <footer className="bg-[#BCDDFE] pt-[125px]">
      <div className="w-[1240px] mx-auto flex justify-between">
        <div className="w-[360px]">
          <p>LOGO HERE</p>
          <p className="text-[16px] mt-[10px]">
            FShop is an online fashion platform that brings a fast, convenient,
            and reliable shopping experience. We offer quality products at great
            prices with dedicated customer support.
          </p>
        </div>
        <div className="w-[260px]">
          <p className="font-medium">Follow us</p>
          <p className="text-[16px] mt-[10px]">
            Stay connected with us through our social platforms for updates and
            exclusive offers.
          </p>
          <div className="flex gap-[20px]"></div>
        </div>
        <div className="w-[260px]">
          <p className="font-medium">Contact us</p>
          <p className="text-[16px] mt-[10px]">
            E-Comm , 4578 Thu Duc District, Ho Chi Minh City
          </p>
        </div>
      </div>
      <div className="bg-[#FAFAFB] h-[1px] mt-[180px]"></div>
      <div className="w-[1240px] mx-auto flex justify-between py-[20px] text-[14px]">
        <p className="text-[#C1C8CE]">© 2025 FShop. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
