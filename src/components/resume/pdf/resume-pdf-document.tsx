import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { IResume } from "@/types/resume.types";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: "Helvetica", color: "#111" },
  header: { textAlign: "center", marginBottom: 16, borderBottom: "1px solid #ccc", paddingBottom: 10 },
  name: { fontSize: 20, fontWeight: 700, marginBottom: 4 },
  contactRow: { flexDirection: "row", justifyContent: "center", gap: 6, fontSize: 9, color: "#444" },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
    borderBottom: "1px solid #ccc", paddingBottom: 3, marginBottom: 6,
  },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  entryTitle: { fontSize: 10, fontWeight: 700 },
  entryMeta: { fontSize: 9, color: "#555" },
  bullet: { flexDirection: "row", marginBottom: 2, paddingLeft: 8 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { fontSize: 9.5, flex: 1, lineHeight: 1.4 },
  paragraph: { fontSize: 9.5, lineHeight: 1.5 },
});

export function ResumePDFDocument({ resume }: { resume: IResume }) {
  const { personalInfo, summary, skills, workExperience, projects, education, certifications } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.fullname}</Text>
          <View style={styles.contactRow}>
            {personalInfo?.email && <Text>{personalInfo.email}</Text>}
            {personalInfo?.mobile && <Text>| {personalInfo.mobile}</Text>}
            {personalInfo?.location && <Text>| {personalInfo.location}</Text>}
            {personalInfo?.github && <Link src={`https://${personalInfo.github.replace(/^https?:\/\//, "")}`}>| GitHub</Link>}
            {personalInfo?.linkedin && <Link src={`https://${personalInfo.linkedin.replace(/^https?:\/\//, "")}`}>| LinkedIn</Link>}
            {personalInfo?.portfolio && <Link src={`https://${personalInfo.portfolio.replace(/^https?:\/\//, "")}`}>| Portfolio</Link>}
          </View>
        </View>

        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>{summary}</Text>
          </View>
        )}

        {!!workExperience?.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {workExperience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{exp.position} · {exp.company}</Text>
                  <Text style={styles.entryMeta}>{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</Text>
                </View>
                {exp.description?.map((d, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{d}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {!!projects?.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.entryTitle}>
                  {proj.title}{!!proj.techStack?.length && ` — ${proj.techStack.join(", ")}`}
                </Text>
                {proj.description?.map((d, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{d}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {!!education?.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entryRow}>
                <Text style={styles.entryTitle}>{edu.degree}, {edu.institution}</Text>
                <Text style={styles.entryMeta}>{edu.startDate} – {edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}

        {!!skills?.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.map((s) => (
              <Text key={s.category} style={{ fontSize: 9.5, marginBottom: 2 }}>
                <Text style={{ fontWeight: 700 }}>{s.category}: </Text>
                {s.items.join(", ")}
              </Text>
            ))}
          </View>
        )}

        {!!certifications?.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((c, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{c}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}