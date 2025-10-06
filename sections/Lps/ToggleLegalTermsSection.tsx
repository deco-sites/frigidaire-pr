// sections/Lps/ToggleLegalTermsSection.tsx
import { useId } from "site/sdk/useId.ts"; // << adicionado
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ToggleLegalTerms from "site/islands/ToggleLegalTerms.tsx";

export interface Props {
  /** Configurações padrão da Section (margens, largura etc.) */
  section?: ISection;

  /** Título/label do toggle */
  title?: string;

  /** Conteúdo dos Termos (texto grande). Aceita quebras de linha; será renderizado em <p> por linha. */
  terms?: string;

  /** Começar aberto? */
  defaultOpen?: boolean;

  /** ID opcional para ancoragem (ex.: #termos) */
  anchorId?: string;
}

export default function ToggleLegalTermsSection({
  section,
  title = "TÉRMINOS Y CONDICIONES LEGALES “MES FRIGIDAIRE GUATEMALA”",
  terms =
    `La presente Actividad se desarrolla en el marco de una campaña de fidelización de la Marca Frigidaire, en el Territorio definido más adelante.
El responsable de estos términos y condiciones (los “Términos y Condiciones”) es Electrolux Consumer Products, Inc.
1. La Actividad
Por la compra válida de uno o más productos de la marca Frigidaire (la “Marca”), por un valor total igual o superior a 499 (cuatrocientos noventa y nueve) quetzales, realizada dentro del período de Vigencia, en cualquiera de las tiendas físicas de los establecimientos de comercio adheridos a la presente actividad, ubicados dentro de la República de Guatemala (los “Comercios Adheridos”), en la que intervenga uno cualquiera de los promotores oficiales autorizados de la Marca (la “Compra Participante”), el cliente recibirá un beneficio de cortesía (el “Beneficio de Cortesía”), según se indica más adelante (la “Actividad”). Todos los clientes que efectúen Compras Participantes dentro del plazo de la Vigencia de la Actividad recibirán una tarjeta (“la Tarjeta”), cuyo Beneficio de Cortesía podrá consistir (i) en una regalía de la Marca (ej. Lapicera, gorra, u otro), o (ii) un valor de crédito determinado en quetzales guatemaltecos (Q),
canjeable por un certificado físico de crédito (el “Certificado de Crédito”) que será redimible exclusivamente en y ante el mismo Comercio Adherido en el que se realizó la Compra Participante, por uno o más de los productos adheridos a la Actividad, definidos por cada Comercio Adherido conforme a sus propias políticas (los “Productos Adheridos”), disponibles para la venta regular en dicho establecimiento, hasta por el monto total del crédito. Todos los términos y condiciones aplicables al canje del Certificado de Crédito productos canjeados, los Productos Adheridos, la entrega y/o envío de productos canjeados y post-venta de los mismos serán definidos
exclusivamente por cada Comercio Adherido. El Certificado de Crédito tendrá una vigencia de 6 (seis) meses calendario desde la fecha de su expedición. La Marca deja expresa constancia que la fecha de emisión de todos los Certificados de Crédito será el 1° de septiembre de 2025.
2. Vigencia y Territorio
La Actividad aplicará a las Compras Participantes realizadas entre el 1° de septiembre de 2025 y el 30 de septiembre de 2025, en las fechas en que los promotores oficiales de la Marca efectúen activaciones en los Comercios Adheridos, o bien, hasta agotar existencias de los productos de la Marca asociados a la Actividad, lo que ocurra primero (la “Vigencia”). La Actividad será válida exclusivamente en el territorio de la República de Guatemala, y únicamente en los Comercios Adheridos a ella.
3. Comercios Adheridos
Participan en la presente Actividad únicamente aquellos Comercios Adheridos que figuran en el siguiente listado oficial: Almacenes Japon Agencias Way El Gallo mas Gallo Elektra Tecno Facil Bodegangas Vivendo Sears Electronica PanamericanaAmericana 2000 Tropigas Siman
La Curacao -
A contar del canje de la Tarjeta por el Certificado de Crédito, cada Comercio Adherido será responsable directo ante cada Cliente de (i) aplicar el canje del Certificado de Crédito por uno o más Productos Adheridos disponibles en su establecimiento, hasta por el monto total del crédito, al momento de ser canjeado por el cliente; (ii) gestionar la facturación, documentación comercial, entrega de productos canjeados, ejecución de garantías aplicables, cambios,
devoluciones o cualquier otra gestión associada a la redención del Certificado de Crédito. 
La Marca no controla ni interviene en las condiciones comerciales internas de cada Comercio Adherido, ni garantiza ni será responsable por los precios, calidad, cualidad, disponibilidad, entrega y/o post-venta de los productos
canjeados, ni la atención al cliente del Comercio Adherido participante.
4. Condiciones y restricciones
La Tarjeta con el Beneficio de Cortesía será entregada al cliente solo al momento de efectuar la Compra Participante dentro de las fechas de activación de la Marca efectuadas por y en presencia de un promotor autorizado de la Marca. En caso de no canjearlo en dicho momento, el derecho del cliente caducará y perderá automáticamente el derecho a recibir la Tarjeta, sin poder reclamarla en forma posterior. La Tarjeta y el Certificado de Crédito son intransferibles y no se admiten su cesión o reventa. El Certificado de Crédito no podrá acumularse con otras promociones, salvo autorización expresa del Comercio Adherido. El Certificado de Crédito no será reembolsable en dinero, ni total ni parcialmente, ni ser canjeado por dinero en efectivo.
El Certificado de Crédito podrá ser utilizado en una o más transacciones, hasta por el monto total del crédito, y deberá ser canjeado por el cliente dentro del plazo de vigencia indicado en el numeral 1. precedente, sin perjuicio de la fecha en que este sea entregado a cada cliente. Vencido este plazo, el Certificado de Crédito caducará de pleno derecho, sin posibilidad de solicitar el canje, reembolso o indemnización alguna a la Marca ni al Comercio Adherido. Queda prohibida la reproducción, venta, intercambio o transferencia de las Tarjetas y/o Certificados de Crédito. Cualquier intento de fraude o falsificación será denunciado y perseguido conforme a la Ley Aplicable. El cliente es el único responsable de resguardar el Certificado de Crédito una vez entregado. En caso de pérdida, extravío, hurto, deterioro ou daño, no se entregarán duplicados, ni existirá derecho a reclamo, reemisión o compensação alguna por parte de la Marca ni el Comercio Adherido.
5. Datos personales
En caso de que para efectos logísticos o de control sea necesario solicitar datos personales del cliente, dichos datos serán tratados conforme a lo establecido en la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Decreto 57-2008 del Congreso de Guatemala). Los datos recolectados podrán ser utilizados por el Comercio Adherido, únicamente con los fines de validación del canje del Certificado de Crédito, y prevenir fraudes. Dichos datos no serán compartidos con terceros salvo obligación legal. El responsable del tratamiento de los datos será el Comercio Adherido correspondiente. Para ejercer sus derechos, el Cliente podrá enviar una solicitud escrita al Comercio Adherido y/o entregarla en el establecimiento respectivo.
6. Propiedad Intelectual
Todos los signos distintivos, logotipos, diseños, nombres comerciales y demás elementos utilizados en la Actividad son propiedad exclusiva de la entidad dueña de la Marca, sus relacionadas y/o de sus licenciantes. Queda estrictamente prohibido su uso por parte de terceros sin autorización expresa y por escrito de la Marca. Nada en estos Términos y Condiciones se interpretará como una cesión de derechos de propiedad intelectual, ni como autorización tácita o expresa para uso por parte de Comercios Adheridos o Clientes.
7. Responsabilidad
La responsabilidad de la Marca se limita única y exclusivamente a la entrega de la Tarjeta con el Beneficio de Cortesía al cliente, a través del promotor autorizado presente en y a cargo de la activación al momento de efectuarse la
Compra Participante en el Comercio Adherido. Es responsabilidad del Cliente canjear la Tarjeta cuyo Beneficio de Cortesía sea un valor de crédito por el Certificado de Crédito, al momento de efectuar la Compra Participante.
La Marca no asume responsabilidad por hechos posteriores a la entrega del Certificado de Crédito, los cuales deberán ser gestionados directamente por y ante el Comercio Adherido, incluyendo, pero sin limitarse a: (i) el canje efectivo
del Certificado de Crédito; (ii) el stock y disponibilidad de productos para el canje del Certificado de Crédito; (iii) la atención al cliente al momento de efectuar el canje del Certificado de Crédito; (iv) la calidad, cualidades y/o garantías aplicables a los productos canjeados; (v) la emisión de comprobantes de pago y/o documentos tributarios aplicables por el canje de los productos; (vi) los cambios o devoluciones de los productos canjeados; (vii) post-venta de los productos canjeados.
8. Modificaciones y cancelación de la Actividad
La Marca se reserva el derecho de modificar, suspender o cancelar total o parcialmente la Actividad, por razones técnicas, comerciales, legales o de fuerza mayor, sin que ello dé lugar a compensación alguna para los clientes. Toda modificación de los Términos y Condiciones será comunicada a través del sitio web oficial de la Marca y/o redes sociales utilizadas para la promoción de la Actividad.
9. Aceptación de los Términos y Condiciones
La participación en la Actividad implica el conocimiento y aceptación expreso e íntegro de los presentes Términos y Condiciones. La no aceptación total o parcial de estos Términos y Condiciones implica la
exclusión automática e inmediata de la Actividad.
10. Naturaleza de la Actividad
Todos los clientes que efectúen Compras Participantes en las condiciones indicadas en estos Términos y Condiciones recibirán un Beneficio de Cortesía predefinido en cada Tarjeta.
11. Ley Aplicable y Jurisdicción
Estos Términos y Condiciones se rigen por las leyes de la República de Guatemala (la “Ley Aplicable”). Para cualquier controversia derivada de la interpretación o ejecución de la presente Actividad, las partes se someten a la jurisdicción exclusiva de los tribunales competentes de la Ciudad de Guatemala, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponder.`,
  defaultOpen = false,
  anchorId,
}: Props) {
  const id = useId(); // << gera um id único para a section

  return (
    <Section id={id} {...section}>
      <ToggleLegalTerms
        title={title}
        terms={terms}
        defaultOpen={defaultOpen}
        anchorId={anchorId}
      />
    </Section>
  );
}
