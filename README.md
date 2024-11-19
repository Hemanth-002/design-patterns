# design-patterns

Design principles

# Chapter - 1
1. Encapsulation : 
   take the parts that vary and encapsulate them, so that later you can alter or extend the parts that vary     without affecting those that don’t.

2. Program to an interface, not an implementation:
   
3. Composition : 
   Favor composition over inheritance.(HAS-A behaviour)

The Strategy Pattern defines a family of algorithms,
encapsulates each one, and makes them interchangeable.
Strategy lets the algorithm vary independently from
clients that use it.
   Ex: Duck example 
   Ex: Character example

   extends -- Inheritance of class  ________|>

   implements -- Implementation of interface -------|> 

   HAS-A -- interface inside class  _________>

# 2 Chapter - 2

The Observer Pattern defines a one-to-many
dependency between objects so that when one
object changes state, all of its dependents are
notified and updated automatically.

1. Strive for loosely coupled designs between objects that interact.