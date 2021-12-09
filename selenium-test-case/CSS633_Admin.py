from selenium import webdriver
import time

#Opening the link in the Chrome Driver 
driver= webdriver.Chrome(executable_path=r"C:\Users\Ajith Krishna\chromedriver.exe")
driver.get("https://cs633-team4-class-scheduler.glitch.me/login")
driver.maximize_window()
driver.implicitly_wait(10)

#Opening Admin page
driver.find_element_by_xpath("/html/body/footer/a").click()
time.sleep(5)

#Giving Admin Key
driver.find_element_by_xpath("/html/body/div/div/form[1]/input").send_keys("passwrd")
driver.find_element_by_xpath("/html/body/div/div/form[1]/button").click()
time.sleep(10)
#Deleting a student
driver.find_element_by_xpath("/html/body/div/div/form[2]/input[1]").send_keys("pssword")
driver.find_element_by_xpath("/html/body/div/div/form[2]/input[2]").send_keys("Hamilton217")
driver.find_element_by_xpath("/html/body/div/div/form[2]/button").click()
time.sleep(10)
#Adding a class
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[1]").send_keys("pssword")
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[2]").send_keys("CS")
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[3]").send_keys("110")
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[4]").send_keys("Introduction to AI")
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[5]").send_keys("This program is about giving a brief knowledge about the concept called Artificial Intelligence")
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[6]").send_keys("Elon")
driver.find_element_by_xpath("/html/body/div/div/form[3]/input[7]").send_keys("FRI 18:00")
driver.find_element_by_xpath("/html/body/div/div/form[3]/button").click()
time.sleep(10)

#Removing a class
driver.find_element_by_xpath("/html/body/div/div/form[4]/input[1]").send_keys("pasword")
driver.find_element_by_xpath("/html/body/div/div/form[4]/input[2]").send_keys("CS")
driver.find_element_by_xpath("/html/body/div/div/form[4]/input[3]").send_keys("110")
driver.find_element_by_xpath("/html/body/div/div/form[4]/button").click()
time.sleep(10)

driver.close()
driver.quit()
