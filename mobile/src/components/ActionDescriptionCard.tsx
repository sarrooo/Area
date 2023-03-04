import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export type ActionDescriptionCardProps = {
  name: string
  description: string
  inputs?: string[]
  outputs?: string[]
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    padding: 24,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'Poppins',
  },
  text: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
})

function ActionDescriptionCard({
  name,
  description,
  inputs = [],
  outputs = [],
}: ActionDescriptionCardProps) {
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Inputs: </Text>
        {inputs?.map((input, index) => {
          return (
            <Text key={input}>
              {index !== 0 ? ', ' : ''}
              {input.split('.')[1]}
            </Text>
          )
        })}
      </View>
      {outputs.length > 0 && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Outputs: </Text>
          {outputs?.map((output, index) => {
            return (
              <Text key={output}>
                {index !== 0 ? ', ' : ''}
                {output.split('.')[1]}
              </Text>
            )
          })}
        </View>
      )}
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}

export default ActionDescriptionCard
