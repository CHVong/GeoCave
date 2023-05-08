import { useEffect } from "react";
import PageHeading from "../../components/PageHeading";
import BasicLink from "../../components/BasicLink";

const Training = () => {
  useEffect(() => {
    document.title = "GeoCave - Training";
  }, []);
  return (
    <div>
      <PageHeading heading={"Training and Professional Development"} />
      <div className="grid lg:grid-cols-2 gap-y-6">
        <div className="flex flex-col">
          <h2 className="underline text-xl">Online 3rd-Party Courses</h2>
          <BasicLink
            url={"https://cpr.heart.org/en/cpr-courses-and-kits/heartsaver/heartsaver-virtual"}
            name={"CPR & First Aid"}
          />
          <BasicLink
            url={"https://www.safetyunlimited.com/online-courses/40-Hour-HAZWOPER-Online.asp"}
            name={"OSHA 40 Hour HAZWOPER"}
          />
          <BasicLink
            url={"https://www.safetyunlimited.com/online-courses/32-Hour-HAZWOPER-Online.asp"}
            name={"OSHA 32 Hour HAZWOPER"}
          />
          <BasicLink
            url={"https://www.safetyunlimited.com/online-courses/24-Hour-Hazwoper-Online.asp"}
            name={"OSHA 24 Hour HAZWOPER"}
          />
          <BasicLink
            url={
              "https://www.safetyunlimited.com/online-courses/10-Hour-General-Industry-Online.asp"
            }
            name={"OSHA 10 Hour General Industry"}
          />
          <BasicLink
            url={
              "https://www.safetyunlimited.com/online-courses/8-Hour-Hazwoper-OSHA-Refresher.asp"
            }
            name={"OSHA 8 Hour HAZWOPER Refresher"}
          />
          <BasicLink
            url={"https://www.unitedrentals.com/training#/"}
            name={"United Rentals Training"}
          />
        </div>
        <div>
          <h2 className="underline text-xl">Board Certifications</h2>
          <BasicLink
            url={"https://www.prometric.com/test-takers/BPELSG"}
            name={"California State Specific Exams"}
          />
          <BasicLink url={"https://www.asbog.org/"} name={"FG and PG Exams"} />
          <BasicLink url={"https://ncees.org/"} name={"FE and PE Exams"} />
          <BasicLink url={"https://search.dca.ca.gov/?BD=31"} name={"License Lookup"} />
          <BasicLink
            url={"https://www.bpelsg.ca.gov/applicants/examination_flowchart_pg.pgp.pdf"}
            name={"Geologist Exam Flowchart"}
          />
          <BasicLink
            url={"https://www.bpelsg.ca.gov/applicants/examination_flowchart.pdf"}
            name={"Engineer Exam Flowchart"}
          />
        </div>
        <div className="lg:col-span-2">
          <h2 className="underline text-xl">In-House Training</h2>
          <BasicLink url={"#"} name={"Permitting"} />
          <BasicLink url={"#"} name={"Sub-contractor Scheduling"} />
          <BasicLink url={"#"} name={"Project Management"} />
          <BasicLink url={"#"} name={"Site Planning"} />
          <BasicLink url={"#"} name={"Equipment Calibrations"} />
          <BasicLink url={"#"} name={"Safety Analysis"} />
          <BasicLink url={"#"} name={"CPT and DPT"} />
          <BasicLink url={"#"} name={"Coring"} />
          <BasicLink url={"#"} name={"ER Testing"} />
          <BasicLink url={"#"} name={"Percolation and Infiltration Testing"} />
          <BasicLink url={"#"} name={"Pile Installation"} />
          <BasicLink url={"#"} name={"Pile Testing"} />
          <BasicLink url={"#"} name={"Marking"} />
          <BasicLink url={"#"} name={"Laboratory Analysis"} />
        </div>
      </div>
    </div>
  );
};

export default Training;
