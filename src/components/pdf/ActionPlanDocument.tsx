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
    borderBottomColor: "#171717",
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
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
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 4,
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
    color: "#0f766e",
    fontFamily: "Helvetica-Bold",
  },
  goalBox: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#f0f4ff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  table: {
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
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
  "Why is this cost high?",
  "Why does that happen?",
  "Why is that the case?",
  "Why does that occur?",
  "Root cause — why ultimately?",
];

export function ActionPlanDocument({ data }: { data: WorkshopData }) {
  const { teamName, section1, section2, section3, section4 } = data;
  const whyKeys: (keyof FiveWhys)[] = ["w1", "w2", "w3", "w4", "w5"];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Fighting Crisis — Action Plan</Text>
          <Text style={styles.subtitle}>Team: {teamName}</Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 1: Identify the Cost Problem (5 Whys)</Text>
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
          <Text style={[styles.label, { marginTop: 6 }]}>Solution Ideas:</Text>
          {section1.solutionIdeas.map((idea, i) => (
            <Text key={i} style={styles.listItem}>
              • {idea}
            </Text>
          ))}
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 2: SMART Goal</Text>
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

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 3: Breakdown & Actions (OKR-lite)</Text>
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

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 4: Reflection</Text>
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
        </View>

        <Text style={styles.footer}>
          Generated by Fighting Crisis Workshop Tool — Geohan Corporation Berhad
        </Text>
      </Page>
    </Document>
  );
}
