import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  titleContainer: {
    padding: 10,
    alignItems: 'center',
    borderBottom: '2 solid #000',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold'
  },
  subTitle: {
    fontSize: 24,
    margin: 2
  },
  listItem: {
    fontSize: 24,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeft: '4 solid #f0f0f0',
  },
  listContainer: {
    flexDirection: 'column',
    padding: 10,
  }
});

export const ShoppingListPDF = ({ user, list }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Nutripal</Text>
        <Text style={styles.subTitle}>{user}'s shopping list</Text>
      </View>
      <View style={styles.listContainer}>
        {list.map((ingredient, index) => (
          <Text style={styles.listItem} key={index}>
            {ingredient.name}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
