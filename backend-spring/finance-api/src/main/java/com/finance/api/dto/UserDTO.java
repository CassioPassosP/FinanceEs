package com.finance.api.dto;

import com.finance.api.model.TypeAchievement;

import java.util.List;
import java.util.Set;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String profileType;
    private Double monthlyBudget;
    private Integer totalPoints;
    private Integer level;
    private Set<TypeAchievement> achievements;

    public UserDTO() {}

    public UserDTO(Long id, String name, String email, String profileType, Double monthlyBudget, Integer totalPoints, Integer level, Set<TypeAchievement> achievements) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profileType = profileType;
        this.monthlyBudget = monthlyBudget;
        this.totalPoints = totalPoints;
        this.level = level;
        this.achievements = achievements;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Double getMonthlyBudget() { return monthlyBudget; }
    public void setMonthlyBudget(Double monthlyBudget) { this.monthlyBudget = monthlyBudget;}

    public String getProfileType() { return profileType; }
    public void setProfileType(String profileType) { this.profileType = profileType; }

    public Integer getTotalPoints() { return totalPoints; }
    public void setTotalPoints(Integer totalPoints) { this.totalPoints = totalPoints; }

    public Integer getCurrentLevel() { return level; }
    public void setCurrentLevel(Integer level) { this.level = level; }

    public Set<TypeAchievement> getAchievements() { return achievements; }
    public void setAchievements(Set<TypeAchievement> achievements) { this.achievements = achievements; }

}
