import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { WorkshopData, FiveWhys } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#dc2626",
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#dc2626",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    backgroundColor: "#fef2f2",
    padding: 8,
    borderRadius: 4,
    color: "#991b1b",
  },
  label: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  text: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
  listItem: {
    marginBottom: 3,
    paddingLeft: 12,
  },
  rootCause: {
    marginBottom: 3,
    paddingLeft: 12,
    color: "#dc2626",
    fontFamily: "Helvetica-Bold",
  },
  goalBox: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  table: {
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#fef2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 6,
  },
  colAction: { flex: 3 },
  colOwner: { flex: 1 },
  colDate: { flex: 1 },
  colName: { flex: 1 },
  colRole: { flex: 1 },
  colCommitment: { flex: 3 },
  bold: { fontFamily: "Helvetica-Bold" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#999",
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
});

const whyLabels = [
  "Why is this a problem right now?",
  "Why does that happen?",
  "Why does that happen?",
  "Why does that happen?",
  "Why does that happen? — Root cause",
];

export function ActionPlanDocument({ data }: { data: WorkshopData }) {
  const { teamName, section1, section2, section3, section4 } = data;
  const whyKeys: (keyof FiveWhys)[] = ["w1", "w2", "w3", "w4", "w5"];
  const hasCommitments = section4.personalCommitments?.some((c) => c.commitment);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Code Red: Ground Zero — Action Plan</Text>
          <Text style={styles.subtitle}>Team: {teamName}</Text>
        </View>

        {/* Mission 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission 1: IDENTIFY THE THREAT (5 Whys)</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Category: </Text>
            {section1.category}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Focus Item: </Text>
            {section1.selectedItem}
          </Text>
          <Text style={styles.label}>5 Whys:</Text>
          {whyKeys.map((key, i) =>
            section1.fiveWhys[key] ? (
              <Text key={key} style={i === 4 ? styles.rootCause : styles.listItem}>
                W{i + 1} ({whyLabels[i]}): {section1.fiveWhys[key]}
              </Text>
            ) : null
          )}
          <Text style={[styles.label, { marginTop: 6 }]}>Solutions (A-D):</Text>
          {section1.solutionIdeas.map((idea, i) => (
            <Text key={i} style={styles.listItem}>
              {String.fromCharCode(65 + i)}. {idea}
            </Text>
          ))}
        </View>

        {/* Mission 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission 2: LOCK IN THE OBJECTIVE (SMART)</Text>
          <View style={styles.goalBox}>
            <Text style={styles.bold}>Goal Statement:</Text>
            <Text style={styles.text}>{section2.goalStatement}</Text>
          </View>
          <Text style={styles.text}>
            <Text style={styles.bold}>Specific: </Text>{section2.smart.specific}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Measurable: </Text>{section2.smart.measurable}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Achievable: </Text>{section2.smart.achievable}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Relevant: </Text>{section2.smart.relevant}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Time-bound: </Text>{section2.smart.timeBound}
          </Text>
          {section2.challenges.length > 0 ? (
            <>
              <Text style={styles.label}>Challenges:</Text>
              {section2.challenges.map((c, i) => (
                <Text key={i} style={styles.listItem}>
                  {i + 1}. {c}
                </Text>
              ))}
            </>
          ) : null}
        </View>

        {/* Mission 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission 3: PLAN THE ATTACK (OKR-lite)</Text>
          <Text style={styles.label}>Key Results:</Text>
          {section3.keyResults.map((kr, i) => (
            <Text key={i} style={styles.listItem}>
              {i + 1}. {kr}
            </Text>
          ))}

          <Text style={[styles.label, { marginTop: 8 }]}>Actions:</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colAction, styles.bold]}>Action</Text>
              <Text style={[styles.colOwner, styles.bold]}>Owner</Text>
              <Text style={[styles.colDate, styles.bold]}>Due Date</Text>
            </View>
            {section3.actions.map((a, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colAction}>{a.description}</Text>
                <Text style={styles.colOwner}>{a.owner}</Text>
                <Text style={styles.colDate}>{a.dueDate}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mission 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission 4: KNOW YOUR WEAKNESS (Commitment)</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Area to Improve: </Text>
            {section4.improvementArea}
          </Text>
          {section4.currentSituation ? (
            <>
              <Text style={styles.label}>Current Situation:</Text>
              <Text style={styles.text}>{section4.currentSituation}</Text>
            </>
          ) : null}
          {section4.desiredOutcome ? (
            <>
              <Text style={styles.label}>Desired Outcome (3 months):</Text>
              <Text style={styles.text}>{section4.desiredOutcome}</Text>
            </>
          ) : null}
          {hasCommitments ? (
            <>
              <Text style={[styles.label, { marginTop: 8 }]}>Personal Commitments:</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.colName, styles.bold]}>Name</Text>
                  <Text style={[styles.colRole, styles.bold]}>Role</Text>
                  <Text style={[styles.colCommitment, styles.bold]}>Commitment</Text>
                </View>
                {section4.personalCommitments
                  .filter((c) => c.commitment)
                  .map((c, i) => (
                    <View key={i} style={styles.tableRow}>
                      <Text style={styles.colName}>{c.name}</Text>
                      <Text style={styles.colRole}>{c.role}</Text>
                      <Text style={styles.colCommitment}>{c.commitment}</Text>
                    </View>
                  ))}
              </View>
            </>
          ) : null}
        </View>

        <Text style={styles.footer}>
          Code Red: Ground Zero — Geohan Corporation Berhad — H1 2026
        </Text>
      </Page>
    </Document>
  );
}
