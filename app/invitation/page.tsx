import DetailShell from "@/components/DetailShell";
import FullscreenControl from "@/components/FullscreenControl";
import { getGuestType, getScheduleTime } from "@/lib/invitation";

const MAPS_URL = "https://maps.app.goo.gl/nvJ9kfAq1H2Nj1Qi8";

type InvitationPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InvitationPage({
  searchParams,
}: InvitationPageProps) {
  const params = await searchParams;
  const guestType = getGuestType(params);
  const scheduleTime = getScheduleTime(guestType);

  return (
    <>
      <FullscreenControl />
      <DetailShell animated>
        <p className="detail__headline">
          YOU ARE
          <br />
          INVITED
        </p>
        <p className="detail__subtitle">FOR THE ENGAGEMENT OF</p>

        <div className="detail__names">
          <span className="detail__name">Milania</span>
          <span className="detail__and">and</span>
          <span className="detail__name">Landrikus</span>
        </div>

        <div className="detail__schedule">
          <div className="detail__date-row">
            <div className="detail__date-side">
              <span className="detail__date-line" aria-hidden="true" />
              <span className="detail__date-day">SABTU</span>
              <span className="detail__date-line" aria-hidden="true" />
            </div>
            <span className="detail__date-num">15</span>
            <div className="detail__date-side">
              <span className="detail__date-line" aria-hidden="true" />
              <span className="detail__date-month">AGUSTUS</span>
              <span className="detail__date-line" aria-hidden="true" />
            </div>
          </div>
          <p className="detail__time">{scheduleTime}</p>
        </div>
        <p className="detail__venue">Beatriss Restaurant and Cafe</p>
        <p className="detail__address">
          Jl. Wijaya II No.77, RT.1/RW.5, Melawai, Kec. Kby.
          <br />
          Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota
          <br />
          Jakarta 12160
        </p>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="detail__location-btn"
        >
          Open Location
        </a>
      </DetailShell>
    </>
  );
}
