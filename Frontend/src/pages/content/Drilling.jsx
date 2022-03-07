import FormCheck from "../../components/FormCheck";

const Drilling = () => {
  return (
    <div>
      <h1 className="m-4 underline text-xl font-bold">Required</h1>
      <FormCheck
        id={"1"}
        title={`Rings (2.5"x1")`}
        imgUrl={
          "https://res.cloudinary.com/dq9umvpmv/image/upload/v1684652491/GeotechRing_g1tdxk.png"
        }
        link={"https://www.shop-esp.com/25-x-1-Stainless-Steel-Liner-P3455.aspx"}
      />
      <FormCheck
        id={"2"}
        title={`Ring Cannisters (2.5"x6")`}
        imgUrl={
          "https://res.cloudinary.com/dq9umvpmv/image/upload/v1684652491/GeotechRingCannister_f9d5do.png"
        }
        link={"https://www.shop-esp.com/Geotech-Canister-for-25-OD-Liners-EMPTY-P3454.aspx"}
      />
      <FormCheck
        id={"3"}
        title={"Plastic liners to bag ring samples"}
        imgUrl={
          "https://res.cloudinary.com/dq9umvpmv/image/upload/v1684653667/GussetedPolyBags_gadq73.png"
        }
        link={"https://www.uline.com/BL_160/Uline-1-Mil-Gusseted-Poly-Bags"}
      />
      <FormCheck
        id={"4"}
        title={"Bulk bags"}
        imgUrl={"https://res.cloudinary.com/dq9umvpmv/image/upload/v1684653735/BulkBags_ot2srs.png"}
        link={"https://www.uline.com/BL_157/Uline-3-Mil-Gusseted-Poly-Bags"}
      />
      <FormCheck
        id={"5"}
        title={"SPT bags"}
        imgUrl={"https://res.cloudinary.com/dq9umvpmv/image/upload/v1684653809/SPTBags_r0vhaf.png"}
        link={"https://www.uline.com/Grp_187/White-Block-Poly-Bags"}
      />
      <FormCheck id={"6"} title={"Paperwork (PTP, logs, proposal, permits, etc.)"} />
      <FormCheck
        id={"7"}
        title={`Writing/labeling supplies (Pens, sharpies, clipboard, masking tape)`}
      />
    </div>
  );
};

export default Drilling;
