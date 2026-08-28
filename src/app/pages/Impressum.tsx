import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export function Impressum() {
  const { content } = useContent();
  const f = content.footer;
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 45% at 100% 0%, rgba(217,20,34,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(61,197,229,0.10) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl lg:text-6xl font-bold"
          >
            Impressum
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Angaben gemäss Schweizer Recht</h2>
            <p>
              SwissBau Renovationen GmbH<br />
              Steigstrasse 19<br />
              Winterthur<br />
              Schweiz
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Vertretungsberechtigte Person</h2>
            <p>Nazli Aliji, Inhaberin &amp; Geschäftsführerin</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Handelsregister</h2>
            <p>
              UID-Nr.: {f.uid ? f.uid : <span className="text-gray-400">[bitte ergänzen]</span>}<br />
              Handelsregisteramt: {f.registryOffice ? f.registryOffice : <span className="text-gray-400">[bitte ergänzen]</span>}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Kontakt</h2>
            <p>
              Telefon: 079 726 19 83<br />
              E-Mail:{" "}
              <a href="mailto:aliji.nazli@gmail.com" className="text-[#d91422] hover:underline">
                aliji.nazli@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Haftungsausschluss</h2>
            <p className="mb-4">
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit
              und Vollständigkeit der Informationen auf dieser Website. Haftungsansprüche gegen den Autor wegen Schäden materieller
              oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen,
              durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
            </p>
            <p>
              Alle Angebote sind unverbindlich. Der Autor behält sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot
              ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig
              einzustellen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Haftung für Links</h2>
            <p>
              Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche
              Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene
              Gefahr des jeweiligen Nutzers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Urheberrechte</h2>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören
              ausschliesslich SwissBau Renovationen GmbH oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher
              Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
