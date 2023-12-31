import {StyleSheet, Text, View, TextInput} from 'react-native'
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense({route, navigation}){
   const expenseCtx = useContext(ExpensesContext)

   const editedExpenseId = route.params?.expenseId;
   const isEditing = !!editedExpenseId

   const selectedExpense = expenseCtx.expenses.find(
      (expense) => expense.id === editedExpenseId
   )


   useLayoutEffect(() => {
      navigation.setOptions({
         title: isEditing ? 'Edit Expense' : 'Add Expense'   
      })
   }, [navigation, isEditing])

   function deleteExpenseHandler(){
      expenseCtx.deleteExpense(editedExpenseId)
      navigation.goBack();
   }

   function cancelHandler(){
      navigation.goBack();
   }
   
   function confirmHandler(expenseData){
      if(isEditing){
         expenseCtx.updateExpense(
            editedExpenseId, expenseData)
      } else {
         expenseCtx.addExpense(expenseData)
      }
      navigation.goBack();
   }

   

 return (
    <View style={styles.container}>
      <ExpenseForm 
         onCancel={cancelHandler}
         onSubmit={confirmHandler} 
         submitButtonLabel={isEditing ? "Update" : "Add"}
         defaultValues={selectedExpense} 
      />
      {isEditing && (
         <View style={styles.deleteContainer}>
            <IconButton 
               icon="trash" 
               color={GlobalStyles.colors.error500} 
               size={36} 
               onPress={deleteExpenseHandler} 
            />
         </View>
      )}
    </View>
 )
}

export default ManageExpense

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary800
   },
   buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center'
   },
   button: {
      minWidth: 120,
      marginHorizontal: 8
   },
   deleteContainer:{
      marginTop: 16,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: GlobalStyles.colors.primary200,
      alignItems: 'center'
   }
})