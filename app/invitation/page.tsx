import DetailShell from "@/components/DetailShell";
import FullscreenControl from "@/components/FullscreenControl";

const MAPS_URL = "https://maps.app.goo.gl/nvJ9kfAq1H2Nj1Qi8";

export default function InvitationPage() {
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

        <p className="detail__date">15.08.2026</p>
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
