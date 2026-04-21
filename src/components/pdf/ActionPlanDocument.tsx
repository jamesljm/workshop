import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { WorkshopData } from "@/lib/types";

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
  bullet: {
    marginBottom: 3,
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

export function ActionPlanDocument({ data }: { data: WorkshopData }) {
  const { teamName, module1, module2, module3, module4 } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Fighting Crisis — Action Plan</Text>
          <Text style={styles.subtitle}>Team: {teamName}</Text>
        </View>

        {/* Module 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Module 1: Fighting Cost Waste</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Category: </Text>
            {module1.category}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Focus Item: </Text>
            {module1.selectedItem}
          </Text>
          <Text style={styles.label}>Ideas:</Text>
          {module1.ideas.map((idea, i) => (
            <Text key={i} style={styles.listItem}>
              • {idea}
            </Text>
          ))}
        </View>

        {/* Module 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Module 2: One Thing to Improve</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Area: </Text>
            {module2.area}
          </Text>
          {module2.currentSituation ? (
            <>
              <Text style={styles.label}>Current Situation:</Text>
              <Text style={styles.text}>{module2.currentSituation}</Text>
            </>
          ) : null}
          {module2.desiredOutcome ? (
            <>
              <Text style={styles.label}>Desired Outcome:</Text>
              <Text style={styles.text}>{module2.desiredOutcome}</Text>
            </>
          ) : null}
        </View>

        {/* Module 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Module 3: Goal & Challenges</Text>
          <Text style={styles.label}>Goal:</Text>
          <Text style={styles.text}>{module3.goal}</Text>
          <Text style={styles.label}>Challenges:</Text>
          {module3.challenges.map((c, i) => (
            <Text key={i} style={styles.listItem}>
              {i + 1}. {c}
            </Text>
          ))}
        </View>

        {/* Module 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Module 4: Breakdown & Action Plan
          </Text>
          <Text style={styles.label}>Sub-Goals:</Text>
          {module4.subGoals.map((sg, i) => (
            <Text key={i} style={styles.listItem}>
              {i + 1}. {sg}
            </Text>
          ))}

          <Text style={[styles.label, { marginTop: 8 }]}>Actions:</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colAction, styles.bold]}>Action</Text>
              <Text style={[styles.colOwner, styles.bold]}>Owner</Text>
              <Text style={[styles.colDate, styles.bold]}>Due Date</Text>
            </View>
            {module4.actions.map((a, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colAction}>{a.description}</Text>
                <Text style={styles.colOwner}>{a.owner}</Text>
                <Text style={styles.colDate}>{a.dueDate}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Generated by Fighting Crisis Workshop Tool
        </Text>
      </Page>
    </Document>
  );
}
