"use client";

import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BillForm } from "../types";
import { InputPrice } from "../InputPrice";
import { useMemo } from "react";
import { InputText } from "../InputText";
import { createId, getTotal } from "../utils";
import Decimal from "decimal.js";

export const ReceiptItems = ({
  goBack,
  goForward,
  formObject,
}: {
  goBack: () => void;
  goForward: () => void;
  formObject: UseFormReturn<BillForm>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: formObject.control,
    name: "billItems",
    keyName: "_id",
  });

  const handleAddItem = () => {
    append({ name: "", price: new Decimal(0), id: createId() });
  };

  const total = useMemo(() => {
    return getTotal(formObject.watch());
  }, [formObject.watch()]);

  const isDisabled = useMemo(() => {
    const products = formObject.watch("billItems") || [];
    return (
      products.length === 0 ||
      products.some((field) => field.name === "") ||
      total.equals(0)
    );
  }, [formObject.watch("billItems"), total]);

  const tip = useMemo(() => {
    return formObject.watch("tip");
  }, [formObject.watch("tip")]);

  const tax = useMemo(() => {
    return formObject.watch("tax");
  }, [formObject.watch("tax")]);
  
  // Get currency from form
  const currency = formObject.watch("currency");
  const currencySymbol = currency?.symbol || "$";
  
  // Log what currency we have (for debugging)
  console.log('ReceiptItems currency:', currency);

  return (
    <>
      <SubPageHeader
        title="Receipt Items"
        description="List all the items on your receipt"
        onBack={() => goBack()}
      />
      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'relative',
              gap: '0.5rem',
              padding: '0.25rem',
              borderRadius: '0.375rem',
              background: index % 2 === 0 ? 'rgba(201, 169, 244, 0.1)' : 'transparent',
              transition: 'background-color 0.2s'
            }}
            key={field._id}
          >
            <InputText
              placeholder="Item name"
              {...formObject.register(`billItems.${index}.name`)}
            />
            <InputPrice
              value={field.price}
              currencySymbol={currency?.symbol}
              onChange={(value) => {
                formObject.setValue(`billItems.${index}.price`, value);
              }}
            />
            <button
              onClick={() => remove(index)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={handleAddItem}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            gap: '0.375rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(to right, #F8F0FF, #EFFCF6)',
            border: '1px solid #C9A9F4',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #E4D3FB, #B5F5E0)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #F8F0FF, #EFFCF6)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={{
            flexGrow: 0,
            fontSize: '1rem',
            fontWeight: '500',
            textAlign: 'center',
            color: '#6D28D9'
          }}>
            Add Item
          </p>
        </button>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #C9A9F4, transparent)',
          margin: '1.25rem 0'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <p style={{
              fontSize: '0.875rem',
              textAlign: 'left',
              color: '#4C1D95',
              fontWeight: '500'
            }}>Tip:</p>
            <InputPrice
              value={tip}
              currencySymbol={currencySymbol}
              onChange={(value) => formObject.setValue("tip", value)}
              className="w-full"
              placeholder="0.00"
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <p style={{
              fontSize: '0.875rem',
              textAlign: 'left',
              color: '#4C1D95',
              fontWeight: '500'
            }}>Tax:</p>
            <InputPrice
              value={tax}
              currencySymbol={currencySymbol}
              onChange={(value) => formObject.setValue("tax", value)}
              className="w-full"
              placeholder="0.00"
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '0.75rem',
          background: 'linear-gradient(to right, transparent, rgba(201, 169, 244, 0.1))',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.125rem'
          }}>
            <span style={{
              fontSize: '1rem',
              color: '#4C1D95',
              fontWeight: '500'
            }}>Total:</span>
            <span style={{ 
              color: '#6D28D9', 
              fontWeight: '600',
              fontSize: '1.5rem',
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'baseline'
            }}>
              <span style={{ fontSize: '1.25rem', marginRight: '0.125rem' }}>{currencySymbol}</span>
              <span>{total.toFixed(2)}</span>
            </span>
          </div>
        </div>
      </div>
      <button
        style={{
          width: '100%',
          marginTop: '1.5rem',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          background: isDisabled ? '#E4D3FB' : 'linear-gradient(to right, #6D28D9, #5B21B6)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.125rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: isDisabled ? '1px solid #C9A9F4' : '1px solid #5B21B6',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.7 : 1,
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={goForward}
        disabled={isDisabled}
      >
        <span style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>Continue</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
};
